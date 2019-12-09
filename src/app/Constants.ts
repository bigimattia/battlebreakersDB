export class Constants {
    /*
    ///// RARITY
    0 - Common
    1 - Uncommon
    2 - Rare
    3 - Very Rare
    4 - Super Rare
    */
    public static get SUPER_RARE_RARITY(): number { return 4; };
    public static get VERY_RARE_RARITY(): number { return  3; };
    public static get RARE_RARITY(): number { return 2; };
    public static get UNCOMMON_RARITY(): number { return 1; };
    public static get COMMON_RARITY(): number { return 0; };

    /*
    ///// CLASSES
    0 - Warrior
    1 - 
    2 - 
    3 - 
    */
    public static get WARRIOR_CLASS(): number { return 0; };
    public static get NECROMANCER_CLASS(): number { return 1; };

    /*
    ///// FACTIONS
    0 - NONE
    1 - ASSAULT_ROBOT_FACTION
    2 - 
    3 - 
    */
   public static get NONE_FACTION(): number { return 0; };
    public static get ASSAULT_ROBOT_FACTION(): number { return 1; };

    /*
    ///// COLORS
    0 - PURPLE
    1 - RED
    2 - YELLOW
    3 - GREEM
    4 - BLUE
    */
    public static get PURPLE_CHARACTER_COLOR(): number { return 0; };
    public static get RED_CHARACTER_COLOR(): number { return 1; };
    public static get YELLOW_CHARACTER_COLOR(): number { return 2; };
    public static get GREEN_CHARACTER_COLOR(): number { return 3; };
    public static get BLUE_CHARACTER_COLOR(): number { return 4; };

    /*
    ///// 0 -> CHARACTER
    ///// 1 -> PET
    */
    public static get TYPE_CHARACTER(): number { return 0; };
    public static get TYPE_PET(): number { return 1; };


    // TO-DO ---  ABILITIES TYPES

    /*
    ///// 
    0 - Class boosting
    1 - Self boosting
    */
    public static get CLASS_BOOSTING__ABILITY_TYPE(): number { return 0; };
    public static get SELF_BOOSTING__ABILITY_TYPE(): number { return 1; };
}