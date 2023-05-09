const schema = [
    {
        "@base": "terminusdb:///lego/data/",
        "@schema": "terminusdb:///lego/schema#",
        "@type": "@context"
    },
    {
        "@id": "Part",
        "@key": {
            "@fields": [
                "part_number"
            ],
            "@type": "Lexical"
        },
        "@type": "Class",
        "category": "Category",
        "material": "Material",
        "name": "xsd:string",
        "part_number": "xsd:string"
    },
    {
        "@id": "PartRelation",
        "@type": "Class",
        "left": "Part",
        "relation_type": "RelationType",
        "right": "Part"
    },
    {
        "@id": "LegoSet",
        "@type": "Class",
        "description": {
            "@class": "xsd:string",
            "@type": "Optional"
        },
        "image_url": {
            "@class": "xsd:anyURI",
            "@type": "Optional"
        },
        "inventory_set": {
            "@class": "InventorySet",
            "@type": "Set"
        },
        "name": "xsd:string",
        "theme": "Theme",
        "year": "xsd:gYear"
    },
    {
        "@id": "Minifig",
        "@key": {
            "@fields": [
                "figure_number"
            ],
            "@type": "Lexical"
        },
        "@type": "Class",
        "figure_number": "xsd:string",
        "img_url": "xsd:anyURI",
        "name": "xsd:string",
        "num_parts": {
            "@class": "xsd:positiveInteger",
            "@type": "Optional"
        }
    },
    {
        "@id": "RelationType",
        "@type": "Enum",
        "@value": [
            "Alternate",
            "Mold",
            "Pair",
            "Pattern",
            "Print",
            "Sub-Part"
        ]
    },
    {
        "@id": "Theme",
        "@key": {
            "@fields": [
                "theme_id",
                "name"
            ],
            "@type": "Lexical"
        },
        "@type": "Class",
        "image_url": {
            "@class": "xsd:anyURI",
            "@type": "Optional"
        },
        "name": "xsd:string",
        "parent": {
            "@class": "Theme",
            "@type": "Optional"
        },
        "theme_id": "xsd:positiveInteger"
    },
    {
        "@id": "Category",
        "@type": "Enum",
        "@value": [
            "Bars, Ladders and Fences",
            "Baseplates",
            "Bricks Sloped",
            "Belville, Scala and Fabuland",
            "Bricks Curved",
            "Bricks Round and Cones",
            "Bricks Special",
            "Bricks Wedged",
            "Bricks",
            "Clikits",
            "Containers",
            "Duplo, Quatro and Primo",
            "Electronics",
            "Flags, Signs, Plastics and Cloth",
            "HO Scale",
            "Hinges, Arms and Turntables",
            "Large Buildable Figures",
            "Magnets and Holders",
            "Mechanical",
            "Minidoll Heads",
            "Minidoll Lower Body",
            "Minidoll Upper Body",
            "Minifig Accessories",
            "Minifig Heads",
            "Minifig Headwear",
            "Minifig Lower Body",
            "Minifig Upper Body",
            "Minifigs",
            "Modulex",
            "Non-Buildable Figures (Duplo, Fabuland, etc)",
            "Non-LEGO",
            "Other",
            "Panels",
            "Plants and Animals",
            "Plates Angled",
            "Plates Round Curved and Dishes",
            "Plates Special",
            "Plates",
            "Pneumatics",
            "Projectiles / Launchers",
            "Rock",
            "Stickers",
            "String, Bands and Reels",
            "Supports, Girders and Cranes",
            "Technic Axles",
            "Technic Beams Special",
            "Technic Beams",
            "Technic Bricks",
            "Technic Bushes",
            "Technic Connectors",
            "Technic Gears",
            "Technic Panels",
            "Technic Pins",
            "Technic Special",
            "Technic Steering, Suspension and Engine",
            "Tiles Round and Curved",
            "Tiles Special",
            "Tiles",
            "Tools",
            "Transportation - Land",
            "Transportation - Sea and Air",
            "Tubes and Hoses",
            "Wheels and Tyres",
            "Windows and Doors",
            "Windscreens and Fuselage",
            "Znap"
        ]
    },
    {
        "@id": "Material",
        "@type": "Enum",
        "@value": [
            "Cardboard/Paper",
            "Cloth",
            "Foam",
            "Metal",
            "Plastic",
            "Rubber"
        ]
    },
    {
        "@id": "Element",
        "@type": "Class",
        "color": {
            "@class": "Color",
            "@type": "Optional"
        },
        "image_url": {
            "@class": "xsd:anyURI",
            "@type": "Optional"
        },
        "part": "Part"
    },
    {
        "@id": "Color",
        "@type": "Class",
        "name": "xsd:string",
        "rgb": "xsd:string",
        "transparent": "xsd:boolean"
    },
    {
        "@id": "InventorySet",
        "@key": {
            "@type": "Random"
        },
        "@subdocument": [],
        "@type": "Class",
        "inventory": "Inventory",
        "quantity": "xsd:positiveInteger"
    },
    {
        "@id": "InventoryPart",
        "@key": {
            "@fields": [
                "inventory_part_id"
            ],
            "@type": "Lexical"
        },
        "@subdocument": [],
        "@type": "Class",
        "element": "Element",
        "inventory_part_id": "xsd:string",
        "quantity": "xsd:positiveInteger",
        "spare": "xsd:boolean"
    },
    {
        "@id": "InventoryMinifig",
        "@key": {
            "@fields": [
                "inventory_minifig_id"
            ],
            "@type": "Lexical"
        },
        "@subdocument": [],
        "@type": "Class",
        "inventory_minifig_id": "xsd:string",
        "minifig": "Minifig",
        "quantity": "xsd:positiveInteger"
    },
    {
        "@id": "Inventory",
        "@type": "Class",
        "inventory_minifigs": {
            "@class": "InventoryMinifig",
            "@type": "Set"
        },
        "inventory_parts": {
            "@class": "InventoryPart",
            "@type": "Set"
        },
        "version": "xsd:positiveInteger"
    }
]

export default schema