const cr_list = [
    "0", "1/8", "1/4", "1/2", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14",
    "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"
];
const cr_dict = {
    "0": {"stat_bonus": 0, "prof_bonus": 2, "ac": 10, "hp": [1, 6], "attack": 2, "total_damage": [0, 1], "save_dc": 12, "num_attacks": 1},
    "1/8": {"stat_bonus": 1, "prof_bonus": 2, "ac": 11, "hp": [7, 35], "attack": 3, "total_damage": [2, 3], "save_dc": 13, "num_attacks": 1},
    "1/4": {"stat_bonus": 1, "prof_bonus": 2, "ac": 12, "hp": [36, 49], "attack": 3, "total_damage": [4, 5], "save_dc": 13, "num_attacks": 1},
    "1/2": {"stat_bonus": 1, "prof_bonus": 2, "ac": 13, "hp": [50, 70], "attack": 3, "total_damage": [6, 8], "save_dc": 13, "num_attacks": 1},
    "1": {"stat_bonus": 1, "prof_bonus": 2, "ac": 13, "hp": [71, 85], "attack": 3, "total_damage": [9, 14], "save_dc": 13, "num_attacks": 2},
    "2": {"stat_bonus": 1, "prof_bonus": 2, "ac": 13, "hp": [86, 100], "attack": 3, "total_damage": [15, 20], "save_dc": 13, "num_attacks": 2},
    "3": {"stat_bonus": 2, "prof_bonus": 2, "ac": 13, "hp": [101, 115], "attack": 4, "total_damage": [21, 26], "save_dc": 13, "num_attacks": 2},
    "4": {"stat_bonus": 2, "prof_bonus": 2, "ac": 14, "hp": [116, 130], "attack": 5, "total_damage": [27, 32], "save_dc": 14, "num_attacks": 2},
    "5": {"stat_bonus": 2, "prof_bonus": 3, "ac": 15, "hp": [131, 145], "attack": 6, "total_damage": [33, 38], "save_dc": 15, "num_attacks": 2},
    "6": {"stat_bonus": 2, "prof_bonus": 3, "ac": 15, "hp": [146, 160], "attack": 6, "total_damage": [39, 44], "save_dc": 15, "num_attacks": 3},
    "7": {"stat_bonus": 2, "prof_bonus": 3, "ac": 15, "hp": [161, 175], "attack": 6, "total_damage": [45, 50], "save_dc": 15, "num_attacks": 3},
    "8": {"stat_bonus": 3, "prof_bonus": 3, "ac": 16, "hp": [176, 190], "attack": 7, "total_damage": [51, 56], "save_dc": 16, "num_attacks": 3},
    "9": {"stat_bonus": 3, "prof_bonus": 3, "ac": 17, "hp": [191, 205], "attack": 7, "total_damage": [57, 62], "save_dc": 16, "num_attacks": 3},
    "10": {"stat_bonus": 3, "prof_bonus": 4, "ac": 17, "hp": [206, 220], "attack": 7, "total_damage": [63, 68], "save_dc": 16, "num_attacks": 3},
    "11": {"stat_bonus": 3, "prof_bonus": 4, "ac": 17, "hp": [221, 235], "attack": 8, "total_damage": [69, 74], "save_dc": 17, "num_attacks": 4},
    "12": {"stat_bonus": 3, "prof_bonus": 4, "ac": 17, "hp": [236, 250], "attack": 8, "total_damage": [75, 80], "save_dc": 17, "num_attacks": 4},
    "13": {"stat_bonus": 4, "prof_bonus": 5, "ac": 18, "hp": [251, 265], "attack": 8, "total_damage": [81, 86], "save_dc": 18, "num_attacks": 4},
    "14": {"stat_bonus": 4, "prof_bonus": 5, "ac": 18, "hp": [266, 280], "attack": 8, "total_damage": [87, 92], "save_dc": 18, "num_attacks": 4},
    "15": {"stat_bonus": 4, "prof_bonus": 5, "ac": 18, "hp": [281, 295], "attack": 8, "total_damage": [93, 98], "save_dc": 18, "num_attacks": 4},
    "16": {"stat_bonus": 4, "prof_bonus": 5, "ac": 18, "hp": [296, 310], "attack": 9, "total_damage": [99, 104], "save_dc": 18, "num_attacks": 5},
    "17": {"stat_bonus": 4, "prof_bonus": 6, "ac": 19, "hp": [311, 325], "attack": 10, "total_damage": [105, 110], "save_dc": 19, "num_attacks": 5},
    "18": {"stat_bonus": 4, "prof_bonus": 6, "ac": 19, "hp": [326, 340], "attack": 10, "total_damage": [111, 116], "save_dc": 19, "num_attacks": 5},
    "19": {"stat_bonus": 4, "prof_bonus": 6, "ac": 19, "hp": [341, 355], "attack": 10, "total_damage": [117, 122], "save_dc": 19, "num_attacks": 5},
    "20": {"stat_bonus": 4, "prof_bonus": 6, "ac": 19, "hp": [356, 400], "attack": 10, "total_damage": [123, 140], "save_dc": 19, "num_attacks": 6},
    "21": {"stat_bonus": 4, "prof_bonus": 7, "ac": 19, "hp": [401, 445], "attack": 11, "total_damage": [141, 158], "save_dc": 20, "num_attacks": 6},
    "22": {"stat_bonus": 4, "prof_bonus": 7, "ac": 19, "hp": [446, 490], "attack": 11, "total_damage": [159, 176], "save_dc": 20, "num_attacks": 6},
    "23": {"stat_bonus": 4, "prof_bonus": 7, "ac": 19, "hp": [491, 535], "attack": 11, "total_damage": [177, 194], "save_dc": 20, "num_attacks": 6},
    "24": {"stat_bonus": 5, "prof_bonus": 7, "ac": 19, "hp": [536, 580], "attack": 12, "total_damage": [195, 212], "save_dc": 21, "num_attacks": 6},
    "25": {"stat_bonus": 5, "prof_bonus": 8, "ac": 19, "hp": [581, 625], "attack": 12, "total_damage": [213, 230], "save_dc": 21, "num_attacks": 6},
    "26": {"stat_bonus": 5, "prof_bonus": 8, "ac": 19, "hp": [626, 670], "attack": 12, "total_damage": [231, 248], "save_dc": 21, "num_attacks": 6},
    "27": {"stat_bonus": 5, "prof_bonus": 8, "ac": 19, "hp": [671, 715], "attack": 13, "total_damage": [249, 266], "save_dc": 22, "num_attacks": 6},
    "28": {"stat_bonus": 5, "prof_bonus": 8, "ac": 19, "hp": [716, 760], "attack": 13, "total_damage": [267, 284], "save_dc": 22, "num_attacks": 6},
    "29": {"stat_bonus": 5, "prof_bonus": 9, "ac": 19, "hp": [761, 805], "attack": 13, "total_damage": [285, 302], "save_dc": 22, "num_attacks": 6},
    "30": {"stat_bonus": 5, "prof_bonus": 9, "ac": 19, "hp": [806, 850], "attack": 14, "total_damage": [303, 320], "save_dc": 23, "num_attacks": 6},
}
const races = {
    "Dwarf": {},
    "Elf": {},
    "Gnome": {},
    "Halfling": {},
    "Human": {},
    "Dragonborn": {},
    "Half-elf": {},
    "Tiefling": {},
}
const weapons = {
    "Weapon attack": {},
    "Shortsword": {},
    "Scimitar": {},
}
const types = {
    "Artillery": {},
    "Brute": {},
    "Minion": {},
    "Soldier": {},
    "Skirmisher": {},
}
let g_hp = "average";
let g_dmg = "average";

export function get_options() {
    /*
    Returns the available CR, Race, and Weapon values, as well as the HP and Damage options.
     */
    return [cr_list, Object.keys(races), Object.keys(weapons), Object.keys(types), g_hp, g_dmg];
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

export function create_npc(name, cr, race=null, type=null, hp=null, dmg=null) {
    if (name === "") {
        name = "Steve";
    }
    let cr_values = cr_dict[cr];
    if (race === null)
        race = "Human";
    // if (weapons === null)
    //     weapons = ["Weapon attack"];
    if (type === null) {
        type = "minion";
    }
    if (hp === null) {
        hp = g_hp;
    }
    if (dmg === null) {
        dmg = g_dmg;
    }
    return {
        "name": name,
        "cr": cr,
        "race": race,
        "type": type,
        "stat_bonus": cr_values["stat_bonus"],
        "prof_bonus": cr_values["prof_bonus"],
        "ac": cr_values["ac"],
        "hp": get_hp_value(cr_values["hp"], hp),
        "attack": cr_values["attack"],
        "damage": get_dmg_value(cr_values["total_damage"], dmg, cr_values["num_attacks"]),
        // "weapons": weapons,
        "save_dc": cr_values["save_dc"],
        "num_attacks": cr_values["num_attacks"],
    }
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

function get_hp_value(values, hp_option) {
    if (hp_option === "average") {
        return avg(values);
    } else if (hp_option === "random") {
        let r = rand_int(values[0], values[1]);
        console.log(r);
        return r;
    }
    console.error(`Invalid HP option: ${hp_option}`);
    return null;
}

function get_dmg_value(values, dmg_option, num_attacks) {
    if (dmg_option === "average") {
        return Math.round(avg(values) / num_attacks);
    } else if (dmg_option === "random") {
        return Math.round(rand_int(values[0], values[1]) / num_attacks);
    } else if (dmg_option === "dice") {
        let die_type = 6;
        let die_avg = 3.5;
        let avg_damage = Math.round(avg(values) / num_attacks);
        console.log(`Average damage: ${avg_damage}`);
        if (avg_damage <= 1) {
            return 1;
        }
        let num_dice = Math.floor(avg_damage / die_avg);  // Number of d6s
        console.log(`Num dice: ${num_dice}`);
        if (num_dice === 0) {
            die_type = 4;
            die_avg = 2.5;
            num_dice = Math.round(avg_damage / die_avg);  // Number of d4s
            console.log(`Num dice: ${num_dice}`);
        }
        let mod = Math.floor(avg_damage - num_dice * die_avg);
        console.log(`Mod: ${mod}`);
        if (mod === 0) {
            return `${avg_damage} (${num_dice}d${die_type})`;
        } else {
            return `${avg_damage} (${num_dice}d${die_type} + ${mod})`;
        }
    }
    console.error(`Invalid damage option: ${dmg_option}`);
    return null;
}
