import { set_options, get_options, create_npc } from "./npc_generator.js";

export function init() {
    const options = get_options();
    let cr_selector = document.querySelector("#cr_selector");
    init_selector(cr_selector, options[0]);
    let race_selector = document.querySelector("#race_selector");
    init_selector(race_selector, options[1]);
    race_selector.value = "Human";
    // init_selector(document.querySelector("#weapon_selector"), options[2]);
    let role_selector = document.querySelector("#role_selector");
    init_selector(role_selector, options[2]);
    role_selector.value = "Minion";
    let die_type_selector = document.querySelector("#die_type_selector");
    let option = document.createElement("option");
    option.value = "--";
    option.text = "--";
    die_type_selector.add(option);
    init_selector(die_type_selector, options[3]);
    die_type_selector.value = "--";
    document.querySelector("#generate").onclick = generate;
    generate();
}

function init_selector(selector, list) {
    list.forEach(x => {
        let option = document.createElement("option");
        option.value = x;
        option.text = x;
        selector.add(option);
    });
    selector.onchange = generate;
}

function generate(event) {
    let name = document.querySelector("#name").value;
    let cr = document.querySelector("#cr_selector").value;
    let race = document.querySelector("#race_selector").value;
    let role = document.querySelector("#role_selector").value;
    let weapon_name = document.querySelector("#weapon_name").value;
    let damage_die_type = document.querySelector("#die_type_selector").value;
    console.log(damage_die_type);
    if (damage_die_type === "--")
        damage_die_type = null;
    let hp_option = document.querySelector('input[name="hp_option"]:checked').value;
    let damage_option = document.querySelector('input[name="damage_option"]:checked').value;
    let npc_dict = create_npc(name, cr, race, role, weapon_name, damage_die_type, hp_option, damage_option);
    console.log(npc_dict);
    document.querySelector("#creature_name").innerText =
        `${npc_dict["name"]} (CR ${npc_dict["cr"]} ${npc_dict["race"]} ${npc_dict["role"]})`;
    document.querySelector("#armor_class").innerText = npc_dict["ac"];
    document.querySelector("#hit_points").innerText = npc_dict["hp"];
    document.querySelector("#skills_untrained").innerText = mod(npc_dict["stat_bonus"]);
    document.querySelector("#skills_proficient").innerText = mod(npc_dict["stat_bonus"] + npc_dict["prof_bonus"]);
    document.querySelector("#skills_expertise").innerText = mod(npc_dict["stat_bonus"] + npc_dict["prof_bonus"] * 2);
    document.querySelector("#attack_name").innerText = `${npc_dict["weapon_name"]} x${npc_dict["num_attacks"]}`;
    document.querySelector("#attack_bonus").innerText = mod(npc_dict["attack"]);
    document.querySelector("#damage").innerText = npc_dict["damage"];
    document.querySelector("#creature_stats").hidden = false;
}

function mod(n) {
    if (n >= 0)
        return `+${n}`;
    return `${n}`;
}