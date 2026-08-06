const CFG = require("./config.js");

module.exports = [
  {
    slug: "sod-calculator",
    metaTitle: "Sod Calculator - How Many Pallets & Rolls of Sod Do I Need?",
    description: "Free sod calculator: find out how many square feet, rolls and pallets of grass sod you need for any lawn area, including waste.",
    h1: "Sod Calculator",
    lead: "Find out exactly how much sod to order for your lawn - in square feet, rolls and pallets - so you never run short on delivery day.",
    toolName: "sod calculator",
    howto: [
      "Measure the length and width of the lawn area in feet. For irregular lawns, split the area into rectangles and circles, calculate each and add them together.",
      "Pick a waste percentage: 5% for simple rectangular lawns, 10% for curved borders and beds. The calculator multiplies your lawn area accordingly and divides by the standard pallet coverage of 450 sq ft.",
      "Most suppliers deliver by the pallet (about 450 sq ft) and sell loose rolls at roughly 10 sq ft each. Order pallets first, then top up with loose rolls to match your exact area."
    ],
    fields: [
      { name: "length", label: "Lawn length", type: "number", unit: "ft", value: 40, min: 1, max: 1000, step: 1 },
      { name: "width", label: "Lawn width", type: "number", unit: "ft", value: 30, min: 1, max: 1000, step: 1 },
      { name: "waste", label: "Waste allowance", type: "select", options: [ { value: 5, label: "5% (rectangular lawn)" }, { value: 10, label: "10% (curved / odd shapes)" } ] }
    ],
    computeJs: `var area = v.length * v.width;
        var withWaste = area * (1 + v.waste / 100);
        var pallets = Math.ceil(withWaste / 450);
        var rolls = Math.ceil(withWaste / 10);
        return [
          { label: "Lawn area", value: area, unit: "sq ft" },
          { label: "Sod needed", value: withWaste, unit: "sq ft", note: v.waste + "% waste" },
          { label: "Pallets needed", value: pallets, unit: "pallets", note: "450 sq ft per pallet" },
          { label: "Loose rolls", value: rolls, unit: "rolls", note: "10 sq ft per roll" }
        ];`,
    faqs: [
      { q: "How many square feet does a pallet of sod cover?", a: "Most suppliers stack roughly 450 square feet of sod on a pallet, but it varies between 400 and 500 sq ft depending on the grower. Ask your supplier for the exact coverage before ordering." },
      { q: "How much does a pallet of sod cost?", a: "Prices typically range from $130-$250 per pallet in the US (2025-2026), plus delivery. Loose rolls cost around $0.30-$0.80 per sq ft when bought in small quantities." },
      { q: "How long can sod sit on a pallet?", a: "Sod is living grass - it should be installed within 24 hours of delivery, and 48 hours at the absolute maximum. On hot days, water it lightly while it waits and keep rolls in the shade." }
    ],
    affiliate: [
      "Grass sod by the pallet (delivery options)",
      "Lawn starter fertilizer and soil prep",
      "Sod knives, rollers and edgers"
    ],
    related: [
      { slug: "gravel-calculator", title: "Gravel Calculator", tag: "Tons for driveways & beds" },
      { slug: "mulch-calculator", title: "Mulch Calculator", tag: "Bags or yards for beds" },
      { slug: "concrete-calculator", title: "Concrete Calculator", tag: "Patio base and walkways" }
    ]
  },
  {
    slug: "mulch-calculator",
    metaTitle: "Mulch Calculator - How Many Bags or Cubic Yards of Mulch Do I Need?",
    description: "Free mulch calculator: work out the cubic yards or number of 2 cu ft bags of bark mulch needed for any garden bed, at any depth.",
    h1: "Mulch Calculator",
    lead: "Get the exact amount of mulch for your flower beds and borders - in cubic yards for bulk delivery or bags from the garden center.",
    toolName: "mulch calculator",
    howto: [
      "Measure the length and width of each bed in feet. For round beds, use the widest diameter in both dimensions - the small corner loss is covered by your depth choice.",
      "Pick a depth: 2 inches for a refreshing layer over existing mulch, 3 inches (recommended) for weed suppression, or 4 inches for new beds with heavy weeds.",
      "One cubic yard covers roughly 108 sq ft at 3 inches deep. In bags, a 2 cu ft bag covers about 8 sq ft at 3 inches - so plan to grab 12-14 bags for a typical 100 sq ft bed."
    ],
    fields: [
      { name: "length", label: "Bed length", type: "number", unit: "ft", value: 20, min: 1, max: 500, step: 0.5 },
      { name: "width", label: "Bed width", type: "number", unit: "ft", value: 5, min: 1, max: 200, step: 0.5 },
      { name: "depth", label: "Mulch depth", type: "select", options: [ { value: 2, label: "2 inches (refreshing)" }, { value: 3, label: "3 inches (recommended)" }, { value: 4, label: "4 inches (new beds)" } ] }
    ],
    computeJs: `var cuft = v.length * v.width * (v.depth / 12);
        var yards = cuft / 27;
        var bags = Math.ceil(cuft / 2);
        return [
          { label: "Area to cover", value: v.length * v.width, unit: "sq ft" },
          { label: "Mulch needed", value: Math.ceil(yards * 10) / 10, unit: "cu yd" },
          { label: "2 cu ft bags", value: bags, unit: "bags", note: "approx " + Math.ceil(bags / 15) + " car trips" }
        ];`,
    faqs: [
      { q: "How much mulch do I need for 100 square feet?", a: "At the recommended 3-inch depth, 100 sq ft needs 25 cu ft of mulch: about 13 bags of 2 cu ft, or just under one cubic yard." },
      { q: "How many square feet does a yard of mulch cover?", a: "One cubic yard of mulch covers about 162 sq ft at 2 inches deep, 108 sq ft at 3 inches, and 81 sq ft at 4 inches." },
      { q: "Should I buy mulch in bags or bulk?", a: "Bags are better for small beds and make spreading easier. For anything over 2 cubic yards, bulk delivery is usually 30-50% cheaper - check your supplier's per-yard price." }
    ],
    affiliate: [
      "Bark mulch and wood chips (bags or bulk)",
      "Landscape fabric for weed control",
      "Shovels, rakes and wheelbarrows"
    ],
    related: [
      { slug: "sod-calculator", title: "Sod Calculator", tag: "Sod for the rest of the yard" },
      { slug: "gravel-calculator", title: "Gravel Calculator", tag: "Rock for paths and beds" },
      { slug: "tile-calculator", title: "Tile Calculator", tag: "Stone tile for patios" }
    ]
  },
  {
    slug: "carpet-calculator",
    metaTitle: "Carpet Calculator - How Much Carpet Do I Need in Square Yards?",
    description: "Free carpet calculator: estimate square feet and square yards of carpet needed for any room, with standard 12-foot roll width waste factored in.",
    h1: "Carpet Calculator",
    lead: "Find out how much carpet to order for a room - in square feet and square yards, the two units every carpet store quotes in.",
    toolName: "carpet calculator",
    howto: [
      "Measure the room length and width in feet. Carpet is sold in 12-foot-wide rolls, so the width of your room determines how much is wasted as trimmings.",
      "If either dimension exceeds 12 feet, the installer must seam two pieces - add one extra foot to the length for every seam to allow pattern matching and trimming.",
      "Carpet is quoted in square yards: divide your square footage by 9. Always order 5-10% extra, because installers cannot splice a small missing piece invisibly."
    ],
    fields: [
      { name: "length", label: "Room length", type: "number", unit: "ft", value: 14, min: 1, max: 200, step: 0.5 },
      { name: "width", label: "Room width", type: "number", unit: "ft", value: 12, min: 1, max: 200, step: 0.5 },
      { name: "pattern", label: "Pattern", type: "select", options: [ { value: 0, label: "Plain / no match" }, { value: 10, label: "Patterned (adds 10%)" } ] }
    ],
    computeJs: `var sqft = v.length * v.width;
        var adjusted = sqft * (1 + v.pattern / 100);
        return [
          { label: "Room area", value: sqft, unit: "sq ft" },
          { label: "Carpet to order", value: adjusted, unit: "sq ft", note: v.pattern === 0 ? "no pattern allowance" : "10% pattern allowance" },
          { label: "Square yards", value: Math.ceil(adjusted / 9 * 10) / 10, unit: "sq yd" }
        ];`,
    faqs: [
      { q: "How many square yards is a 12x12 room?", a: "A 12x12 room is 144 sq ft, which is exactly 16 square yards of carpet before waste. With a plain carpet and clean seams, 16-18 sq yd is a safe order." },
      { q: "Why do carpet installers charge for waste?", a: "Carpet comes in 12-foot-wide rolls, so a 14x12 room needs a 14-foot length of a 12-foot-wide roll: 168 sq ft of carpet for a 144 sq ft floor. That off-cut is still charged." },
      { q: "How much does carpet cost per square foot?", a: "Installed carpet typically runs $3-$8 per sq ft in 2025-2026: $2-$4 for materials and $1.50-$3 for installation, padding and removal of the old carpet." }
    ],
    affiliate: [
      "Carpet by the square yard (all styles)",
      "Carpet padding and tack strips",
      "Carpet stretcher and seam irons"
    ],
    related: [
      { slug: "flooring-calculator", title: "Flooring Calculator", tag: "Laminate and vinyl alternative" },
      { slug: "tile-calculator", title: "Tile Calculator", tag: "Tile alternative for the room" },
      { slug: "paint-calculator", title: "Paint Calculator", tag: "Paint the walls around it" }
    ]
  },
  {
    slug: "brick-calculator",
    metaTitle: "Brick Calculator - How Many Bricks Do I Need for a Wall or Patio?",
    description: "Free brick calculator: estimate how many modular or standard bricks you need for a wall or patio, with mortar joint and waste allowance.",
    h1: "Brick Calculator",
    lead: "Work out how many bricks to order for a wall, path or patio - including mortar joints and the 10% waste every bricklayer budgets for.",
    toolName: "brick calculator",
    howto: [
      "Measure the area to be covered: length and height for a wall, length and width for a patio. Both in feet.",
      "Choose the brick size. Modular bricks (3.6 x 2.25 x 8 inches) need about 7 per sq ft with a 3/8-inch mortar joint; standard bricks need about 7.5, and larger oversize bricks only 5-6.",
      "Always add 10%: brick arrives damaged, corners get cut, and you will want matching bricks for future repairs - matching a production batch later is impossible."
    ],
    fields: [
      { name: "length", label: "Area length", type: "number", unit: "ft", value: 20, min: 1, max: 500, step: 0.5 },
      { name: "height", label: "Area height", type: "number", unit: "ft", value: 3, min: 0.5, max: 50, step: 0.25 },
      { name: "bricks", label: "Bricks per sq ft", type: "select", options: [ { value: 5, label: "5-6 (oversize brick)" }, { value: 7, label: "7 (modular, standard)" }, { value: 7.5, label: "7.5 (standard brick)" }, { value: 9, label: "9 (thin brick, 3/8 joint)" } ] }
    ],
    computeJs: `var area = v.length * v.height;
        var bricks = Math.ceil(area * v.bricks * 1.1);
        return [
          { label: "Area to cover", value: area, unit: "sq ft" },
          { label: "Bricks needed", value: bricks, unit: "bricks", note: "includes 10% waste" }
        ];`,
    faqs: [
      { q: "How many bricks do I need for a 10x10 patio?", a: "A 10x10 patio is 100 sq ft. With modular bricks at 7 per sq ft, that is 700 bricks plus 10% waste: about 770 bricks total." },
      { q: "How many bricks are in a cube or pallet?", a: "Bricks are typically packed 500 per cube/pallet (some suppliers pack 450-550). Order full pallets, then add loose bricks to match your calculated total." },
      { q: "How much mortar do I need for a brick wall?", a: "One bag of mortar mix covers roughly 30-40 sq ft of brick wall at a standard 3/8-inch joint. For a 100 sq ft wall, plan on 3-4 bags." }
    ],
    affiliate: [
      "Bricks and pavers (all styles)",
      "Mortar mix and masonry cement",
      "Trowels, levels and jointers"
    ],
    related: [
      { slug: "concrete-calculator", title: "Concrete Calculator", tag: "Footings for the wall" },
      { slug: "gravel-calculator", title: "Gravel Calculator", tag: "Base for brick paths" },
      { slug: "tile-calculator", title: "Tile Calculator", tag: "Alternative paving materials" }
    ]
  },
  {
    slug: "fence-calculator",
    metaTitle: "Fence Calculator - Posts, Rails & Pickets Needed for a Fence",
    description: "Free fence calculator: find out how many posts, rails and linear feet of fencing you need for any yard perimeter.",
    h1: "Fence Calculator",
    lead: "Plan a fence in minutes: number of posts, rails and the total linear feet you need for any yard size and post spacing.",
    toolName: "fence calculator",
    howto: [
      "Measure the total perimeter you want to fence in feet. For a rectangular yard, add the two lengths and two widths; add extra for gates and corners that change the run.",
      "Choose your post spacing: 8 feet is standard for wood fences, 6 feet for windy areas or vinyl, and 10 feet for simple wire fences. The calculator adds one post for the starting corner.",
      "Rails run horizontally between posts: 2 rails for a 4-foot fence, 3 rails for 6-foot privacy fencing. Rails are usually sold in 8 or 12-foot pieces - the calculator counts full pieces."
    ],
    fields: [
      { name: "length", label: "Fence length", type: "number", unit: "ft", value: 120, min: 1, max: 5000, step: 1 },
      { name: "spacing", label: "Post spacing", type: "select", options: [ { value: 6, label: "6 ft (windy areas)" }, { value: 8, label: "8 ft (standard wood)" }, { value: 10, label: "10 ft (wire / low fence)" } ] },
      { name: "rails", label: "Rails per section", type: "select", options: [ { value: 2, label: "2 (4 ft fence)" }, { value: 3, label: "3 (6 ft privacy fence)" } ] },
      { name: "railLength", label: "Rail piece length", type: "select", options: [ { value: 8, label: "8 ft" }, { value: 12, label: "12 ft" } ] }
    ],
    computeJs: `var posts = Math.ceil(v.length / v.spacing) + 1;
        var railFeet = v.length * v.rails;
        var railPieces = Math.ceil(railFeet / v.railLength);
        return [
          { label: "Fence length", value: v.length, unit: "linear ft" },
          { label: "Posts needed", value: posts, unit: "posts", note: "incl. starting post" },
          { label: "Rail length", value: railFeet, unit: "linear ft" },
          { label: "Rail pieces", value: railPieces, unit: "pieces", note: v.railLength + " ft each" }
        ];`,
    faqs: [
      { q: "How many fence posts do I need for 100 feet?", a: "At 8-foot spacing, 100 feet needs about 13 posts (12 sections plus the starting post). At 6-foot spacing it is 17 posts, and at 10-foot spacing 11 posts." },
      { q: "How deep should fence posts be set?", a: "Set posts one-third of their length in concrete: a standard 8-foot post with 2 feet below ground, using 1-2 bags of quick-set concrete per post." },
      { q: "How far apart should pickets be on a privacy fence?", a: "For a solid privacy fence, place pickets flush with a 3/8 to 1/2-inch gap. A 6-foot tall board-on-board design needs about 3 pickets per linear foot of fence." }
    ],
    affiliate: [
      "Fence posts and post anchors",
      "Fence rails and pickets (all styles)",
      "Post-hole diggers and quick-set concrete"
    ],
    related: [
      { slug: "gravel-calculator", title: "Gravel Calculator", tag: "Base rock for post holes" },
      { slug: "concrete-calculator", title: "Concrete Calculator", tag: "Concrete for setting posts" },
      { slug: "lumber-calculator", title: "Board Foot Calculator", tag: "Lumber volume for the build" }
    ]
  }
];
