export class Character {
    ID_CHARACTER: string;
    type: number;
    name: string;
    character_class: number;
    faction: number;
    color: number;
    rarity: number;
    commander_ability_type: number[];
    passive_ability_type: number[];
    special_ability_type: number[];
    commander_ability_desc: string;
    passive_ability_desc: string;
    special_ability_desc: string;

    character_hp: number;
    character_atk: number;
    character_mana_pool: number;
    character_recharge_time: number;
    character_defense: number;
    character_mascotte_value: number;
    //character_power: number;

    special_ability_mana_cost: number;
    special_ability_recharge_time: number;
    
    reflex_attack_is_combo: boolean;
    reflex_attack_desc: string;
    reflex_attack_trigger: number; // Trigger value, %
    reflex_attack_combo_desc: string[];
    reflex_attack_combo_component_trigger: number[];

    reflex_defense_is_combo: boolean;
    reflex_defense_desc: string;
    reflex_defense_trigger: number; // Trigger value, %
    reflex_defense_combo_desc: string[];
    reflex_defense_combo_component_trigger: number[];
}