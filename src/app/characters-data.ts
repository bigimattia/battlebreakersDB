import { Character } from './Character';
import { Constants } from './Constants';

export const CHARACTERS: Character[] = [
    {
        ID_CHARACTER: '0',
        type: Constants.TYPE_CHARACTER,
        name: 'prova',
        character_class: Constants.WARRIOR_CLASS,
        faction: Constants.ASSAULT_ROBOT_FACTION,
        color: Constants.BLUE_CHARACTER_COLOR,
        rarity: Constants.COMMON_RARITY,
        commander_ability_type: Constants.CLASS_BOOSTING_PASSIVE_ABILITY_TYPE,
        passive_ability_type: Constants.CLASS_BOOSTING_PASSIVE_ABILITY_TYPE,
        special_ability_type: Constants.CLASS_BOOSTING_SPECIAL_ABILITY_TYPE,
        commander_ability_desc: 'forte',
        passive_ability_desc: 'ok',
        special_ability_desc: 'meh',

        character_hp: 10000,
        character_atk: 1000,
        character_mana_pool: 122,
        character_recharge_time: 4,
        character_defense: 304,
        character_mascotte_value: 300,

        special_ability_mana_cost: 30,
        special_ability_recharge_time: 3,
    
        reflex_attack_is_combo: false,
        reflex_attack_desc: 'provaDESCATKREX',
        reflex_attack_trigger: 30, // Trigger value, %
        reflex_attack_combo_desc: [],
        reflex_attack_combo_component_trigger: [],

        reflex_defense_is_combo: false,
        reflex_defense_desc: 'provaDESCDEFREX',
        reflex_defense_trigger: 20, // Trigger value, %
        reflex_defense_combo_desc: [],
        reflex_defense_combo_component_trigger: []
    },
    {
        ID_CHARACTER: '1',
        type: Constants.TYPE_CHARACTER,
        name: 'prova2',
        character_class: Constants.NECROMANCER_CLASS,
        faction: Constants.ASSAULT_ROBOT_FACTION,
        color: Constants.GREEN_CHARACTER_COLOR,
        rarity: Constants.SUPER_RARE_RARITY,
        commander_ability_type: Constants.CLASS_BOOSTING_PASSIVE_ABILITY_TYPE,
        passive_ability_type: Constants.CLASS_BOOSTING_PASSIVE_ABILITY_TYPE,
        special_ability_type: Constants.CLASS_BOOSTING_SPECIAL_ABILITY_TYPE,
        commander_ability_desc: 'forte',
        passive_ability_desc: 'ok',
        special_ability_desc: 'meh',

        character_hp: 10000,
        character_atk: 1000,
        character_mana_pool: 122,
        character_recharge_time: 4,
        character_defense: 307,
        character_mascotte_value: 300,

        special_ability_mana_cost: 30,
        special_ability_recharge_time: 3,
    
        reflex_attack_is_combo: false,
        reflex_attack_desc: 'provaDESCATKREX',
        reflex_attack_trigger: 30, // Trigger value, %
        reflex_attack_combo_desc: [],
        reflex_attack_combo_component_trigger: [],

        reflex_defense_is_combo: false,
        reflex_defense_desc: 'provaDESCDEFREX',
        reflex_defense_trigger: 20, // Trigger value, %
        reflex_defense_combo_desc: [],
        reflex_defense_combo_component_trigger: []
    }
];