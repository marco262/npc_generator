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
    role_selector.value = "--";
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
    let cr = document.querySelector("#cr_selector").value;
    let race = document.querySelector("#race_selector").value;
    let role = document.querySelector("#role_selector").value;
    let weapon_name = document.querySelector("#weapon_name").value;
    if (weapon_name === "")
        weapon_name = "Weapon attack"
    let damage_die_type = document.querySelector("#die_type_selector").value;
    if (damage_die_type === "--")
        damage_die_type = "";
    let hp_option = document.querySelector('input[name="hp_option"]:checked').value;
    let damage_option = document.querySelector('input[name="damage_option"]:checked').value;
    let npc_dict = create_npc(cr, race, role, damage_die_type, hp_option, damage_option);
    console.log(npc_dict);
    let creature_name = `CR ${npc_dict["cr"]} ${npc_dict["race"].toLowerCase()}`;
    if (npc_dict["role"] !== "--")
        creature_name += ` ${npc_dict["role"].toLowerCase()}`;
    document.querySelector("#creature_name").innerText = creature_name;
    const creature_traits = document.querySelector("#creature_traits");
    creature_traits.querySelector("#armor_class").innerText = npc_dict["ac"];
    creature_traits.querySelector("#hit_points").innerText = npc_dict["hp"];
    creature_traits.querySelector("#speed").innerText = npc_dict["speed"];
    creature_traits.querySelector("#skills_untrained").innerText = mod(npc_dict["stat_bonus"]);
    creature_traits.querySelector("#skills_proficient").innerText = mod(npc_dict["stat_bonus"] + npc_dict["prof_bonus"]);
    creature_traits.querySelector("#skills_expertise").innerText = mod(npc_dict["stat_bonus"] + npc_dict["prof_bonus"] * 2);
    optional_trait("#damage_resistances", npc_dict["damage_resistances"]);
    optional_trait("#damage_immunities", npc_dict["damage_immunities"]);
    optional_trait("#senses", npc_dict["senses"]);
    clear_and_build_section("special_abilities", npc_dict["special_abilities"]);
    let actions = [`<b><em>${weapon_name} x${npc_dict["num_attacks"]}.</em></b> ${mod(npc_dict["attack"])} to hit. <em>Hit:</em> ${npc_dict["damage"]} damage.`];
    actions = actions.concat(npc_dict["actions"]);
    clear_and_build_section("actions", actions);
    clear_and_build_section("reactions", npc_dict["reactions"]);
    document.querySelector("#creature_stats").hidden = false;
}

function mod(n) {
    if (n >= 0)
        return `+${n}`;
    return `${n}`;
}

function optional_trait(id, value) {
    const container = document.querySelector(id);
    if (value === "" || value.length === 0) {
        container.hidden = true;
    } else {
        container.querySelector(".text").innerText = value;
        container.hidden = false;
    }
}

function clear_and_build_section(section_id, list) {
    const header = document.querySelector(`#${section_id}_header`);
    const section = document.querySelector(`#${section_id}`);
    if (list.length === 0) {
        header.hidden = true;
        section.hidden = true;
    } else {
        // Remove all nodes in section
        while (section.firstChild) {
            section.removeChild(section.firstChild);
        }
        list.forEach(e => {
            let p = document.createElement("p");
            p.innerHTML = e;
            section.appendChild(p);
        })
        header.hidden = false;
        section.hidden = false;
    }
}