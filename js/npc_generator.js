import {cr_dict, cr_list, die_types, races, roles} from "./data.js";

let g_hp = "average";
let g_dmg = "average";

export function get_options() {
    /*
    Returns the available CR, Race, and Weapon values, as well as the HP and Damage options.
     */
    return [cr_list, Object.keys(races), Object.keys(roles), Object.keys(die_types), g_hp, g_dmg];
}

export function set_options(hp="average", damage="average") {
    /*
    Sets the global options for all created NPCs for how their HP and Damage are calculated.
    The `hp` parameter accepts the following values:
      * average: The average of the range given, taking into account racial and other bonuses.
      * random: A random value from within the range given, taking into account racial and other bonuses.
    The `damage` parameter accepts the same values as `hp`, as well as the following:
      * dice: A best-guess for a dice value based on the damage range, with a modifier to bring the average dice roll
              up to the average of the damage range. If a weapon value is provided (either weapon name or dice value),
              that weapon value will be used instead, and the damage modifier will be adjusted as appropriate.
    @param hp
    @param dmg
     */
    g_hp = hp;
    g_dmg = damage;
}

export function create_npc(cr, race="", role="", damage_die_type="", hp="", dmg="") {
    if (race === "")
        race = "Human";
    if (hp === "") {
        hp = g_hp;
    }
    if (dmg === "") {
        dmg = g_dmg;
    }
    const cr_values = cr_dict[cr];
    const atk_dict = get_attack(cr, race, role);
    const def_dict = get_defense(cr, race, role);
    const damage = get_dmg_value(atk_dict["total_damage"], dmg, atk_dict["num_attacks"], damage_die_type);
    const save_dc = atk_dict["save_dc"];
    return {
        "cr": cr,
        "race": race,
        "role": role,
        "speed": get_speed(races[race]),
        "stat_bonus": cr_values["stat_bonus"],
        "prof_bonus": cr_values["prof_bonus"],
        "ac": def_dict["ac"],
        "hp": get_hp_value(def_dict["hp"], hp),
        "damage_resistances": get_list(race, role, "damage_resistances"),
        "damage_immunities": get_list(race, role, "damage_immunities"),
        "senses": get_trait(race, role, "senses"),
        "special_abilities": fill_placeholders(get_list(race, role, "special_abilities"), damage, save_dc),
        "actions": fill_placeholders(get_list(race, role, "actions"), damage, save_dc),
        "reactions": fill_placeholders(get_list(race, role, "reactions"), damage, save_dc),
        "attack": atk_dict["attack"],
        "damage": damage,
        "save_dc": save_dc,
        "num_attacks": atk_dict["num_attacks"],
    }
}

function get_speed(d) {
    if (d.hasOwnProperty("speed"))
        return d["speed"];
    return "30 ft.";
}

function get_attack(cr, race, role) {
    return get_adjusted_cr_dict(cr, race, role, "atk_cr");
}

function get_defense(cr, race, role) {
    return get_adjusted_cr_dict(cr, race, role, "def_cr");
}

function get_adjusted_cr_dict(cr, race, role, key) {
    let d = races[race];
    if (d.hasOwnProperty(key))
        cr = adjust_cr(cr, d[key]);
    d = roles[role];
    if (d.hasOwnProperty(key))
        cr = adjust_cr(cr, d[key]);
    return cr_dict[cr];
}

function adjust_cr(cr, adjustment) {
    if (adjustment === 0) {
        return cr;
    }
    let index = cr_list.indexOf(cr.toString());
    index += adjustment;
    index = Math.min(Math.max(index, 0), cr_list.length - 1);
    return cr_list[index];
}

function get_hp_value(values, hp_option) {
    if (hp_option === "average") {
        return avg(values);
    } else if (hp_option === "random") {
        return rand_int(values[0], values[1]);
    }
    console.error(`Invalid HP option: ${hp_option}`);
    return null;
}

function get_trait(race, role, key) {
    const list = get_list(race, role, key);
    return list.join(",");
}

function fill_placeholders(list, damage, save_dc) {
    for (let i=0; i < list.length; i++) {
        list[i] = list[i].replaceAll("{damage}", damage);
        list[i] = list[i].replaceAll("{save_dc}", save_dc);
    }
    return list;
}

function get_list(race, role, key) {
    let list = [];
    let d = races[race];
    if (d.hasOwnProperty(key))
        list = list.concat(d[key]);
    d = roles[role];
    if (d.hasOwnProperty(key))
        list = list.concat(d[key]);
    return list;
}

function get_dmg_value(values, dmg_option, num_attacks, die_type) {
    if (dmg_option === "average") {
        return Math.round(avg(values) / num_attacks);
    } else if (dmg_option === "random") {
        return Math.round(rand_int(values[0], values[1]) / num_attacks);
    } else if (dmg_option === "dice") {
        let avg_damage = Math.round(avg(values) / num_attacks);
        // console.log(`Average damage: ${avg_damage}`);
        let die_avg;
        if (die_type === "") {
            die_avg = 3.5;  // Default to d6
        } else {
            die_avg = die_types[die_type];
        }
        // console.log(`Die type: ${die_type}`);
        // console.log(`Die average: ${die_avg}`);
        let num_dice = Math.floor(avg_damage / die_avg);  // Number of d6s
        // console.log(`Num dice: ${num_dice}`);
        if (num_dice === 0) {
            if (die_type === "") {  // If die_type is undefined and the damage is too small, allow us to drop to d4
                die_type = "d4";
                die_avg = 2.5;
                num_dice = Math.round(avg_damage / die_avg);  // Number of d4s
            }
            if (num_dice === 0) {
                num_dice = 1;  // Always roll a minimum of 1 die, and let the modifier be negative
            }
            // console.log(`Num dice: ${num_dice}`);
        }
        let mod = Math.floor(avg_damage - num_dice * die_avg);
        // console.log(`Mod: ${mod}`);
        if (die_type === "") {
            die_type = "d6";
        }
        if (mod === 0) {
            return `${avg_damage} (${num_dice}${die_type})`;
        } else if (mod > 0) {
            return `${avg_damage} (${num_dice}${die_type} + ${mod})`;
        } else {
            return `${avg_damage} (${num_dice}${die_type} - ${Math.abs(mod)})`;
        }
    }
    console.error(`Invalid damage option: ${dmg_option}`);
    return null;
}

function avg(tuple) {
    return Math.round((tuple[0] + tuple[1]) / 2);
}

function rand_int(min, max) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}



// Unit Tests

function assertEqual(actual, expected) {
    if (actual !== expected) {
        console.error(`${actual} (type=${typeof actual}) !== ${expected} (type=${typeof expected})`);
    }
}

assertEqual(adjust_cr("0", 1),  "1/8");
assertEqual(adjust_cr("0", 2),  "1/4");
assertEqual(adjust_cr("0", 3),  "1/2");
assertEqual(adjust_cr("0", 4),  "1");
assertEqual(adjust_cr("0", 5),  "2");
assertEqual(adjust_cr("29", 5),  "30");
assertEqual(adjust_cr("2", 0),  "2");
assertEqual(adjust_cr("2", -1),  "1");
assertEqual(adjust_cr("2", -2),  "1/2");
assertEqual(adjust_cr("2", -3),  "1/4");
assertEqual(adjust_cr("2", -4),  "1/8");
assertEqual(adjust_cr("2", -5),  "0");
assertEqual(adjust_cr("2", -6),  "0");
