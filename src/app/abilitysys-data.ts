import { AbilitySys } from './AbilitySys';
import { Constants } from './Constants';

export const ABILITIES: AbilitySys[] = [
    {
        ABILITY_ID: Constants.CLASS_BOOSTING__ABILITY_TYPE,
        ability_type_name: "class boost",
        is_commander: true,
        is_passive: false,
        is_special: true
    },
    {
        ABILITY_ID: Constants.SELF_BOOSTING__ABILITY_TYPE,
        ability_type_name: "self buff",
        is_commander: false,
        is_passive: true,
        is_special: false
    }
]