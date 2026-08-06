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
  },
  {
    slug: "concrete-calculator",
    metaTitle: "Concrete Calculator - Cubic Yards &amp; Bags for Slab, Footing or Pad",
    description: "Free concrete calculator: figure out cubic yards and the number of 40, 60 or 80 lb bags for any slab, pad, footing or patio. Includes waste allowance.",
    h1: "Concrete Calculator",
    lead: "Work out exactly how much concrete you need for a slab, patio, footing or shed pad - in cubic feet, cubic yards, and the number of 40/60/80 lb bags.",
    toolName: "concrete calculator",
    howto: [
      "Measure the length and width of your pour in feet and its depth in inches. Pick your waste allowance (5% is standard) and the bag size you plan to use. The calculator converts everything to cubic yards and tells you how many bags to buy - or whether it is worth ordering a ready-mix truck instead.",
      "As a rule of thumb, anything over about 1 cubic yard (45+ bags) is usually cheaper and less back-breaking with a concrete delivery. If you are mixing by hand, rent a mixer for anything bigger than a handful of bags."
    ],
    fields: [
{ name: "length", label: "Length", unit: "ft", value: 10, min: 0.5, max: 500, step: 0.5 },
  { name: "width", label: "Width", unit: "ft", value: 10, min: 0.5, max: 500, step: 0.5 },
  { name: "depth", label: "Depth", unit: "in", value: 4, min: 1, max: 48, step: 0.5 },
  { name: "waste", label: "Waste allowance", type: "select", options: [ { value: 0, label: "0%" }, { value: 5, label: "5% (recommended)" }, { value: 10, label: "10%" }, { value: 15, label: "15%" } ] },
  { name: "bag", label: "Bag size", type: "select", options: [ { value: 40, label: "40 lb (0.30 cu ft)" }, { value: 60, label: "60 lb (0.45 cu ft)" }, { value: 80, label: "80 lb (0.60 cu ft)" }, { value: 0, label: "Ready-mix delivery" } ] }
    ],
    computeJs: `var cuft = v.length * v.width * (v.depth / 12) * (1 + v.waste / 100);
var yards = cuft / 27;
var out = [
  { label: "Volume needed", value: cuft, unit: "cu ft", note: "includes " + v.waste + "% waste" },
  { label: "Concrete needed", value: yards, unit: "cu yd" }
];
if (v.bag > 0) {
  var bagCuft = v.bag === 40 ? 0.30 : v.bag === 60 ? 0.45 : 0.60;
  out.push({ label: v.bag + " lb bags needed", value: Math.ceil(cuft / bagCuft), unit: "bags" });
} else {
  out.push({ label: "Order", value: Math.ceil(yards), unit: "cu yd", note: "round up for delivery" });
}
return out;`,
    faqs: [
      { q: "How thick should a concrete slab be?", a: "4 inches for patios and walkways, 4-6 inches for shed and garage floors, and 8-12 inches for driveways or load-bearing footings. Reinforce with rebar or wire mesh on thicker slabs." },
      { q: "How many cubic feet is in a cubic yard?", a: "27 cubic feet (3 x 3 x 3). To convert, divide the volume in cubic feet by 27." },
      { q: "How much does a cubic yard of concrete cost?", a: "Ready-mix concrete typically costs $130-$180 per cubic yard in the US (2025-2026 prices), with a delivery minimum fee on top. Bags of mix usually cost more per yard but avoid the minimum." }
    ],
    affiliate: [
      "Concrete mix bags (40/60/80 lb)",
      "Rebar and wire mesh for reinforcement",
      "Concrete trowels and screed boards"
    ],
    related: [
      { slug: "gravel-calculator", title: "Gravel Calculator", tag: "Tons of rock or gravel needed" },
      { slug: "rebar-calculator", title: "Rebar Calculator", tag: "Bars and spacing for a slab" },
      { slug: "lumber-calculator", title: "Board Foot Calculator", tag: "Lumber volume and cost" }
    ]
  },
  {
    slug: "deck-stain-calculator",
    metaTitle: "Deck Stain Calculator - How Much Stain Do I Need?",
    description: "Free deck stain calculator: estimate the gallons of stain or sealer needed for your deck, including railings, steps and multiple coats.",
    h1: "Deck Stain Calculator",
    lead: "Find out how many gallons of deck stain or sealer you need - board surface, railings, and multiple coats all included.",
    toolName: "deck stain calculator",
    howto: [
      "Measure the deck surface (length x width). Add railings or steps to include their extra surface area. Pick the coverage of the stain you plan to buy - most cans state the expected sq ft per gallon for smooth wood - and choose one or two coats.",
      "New, bare or rough-sawn wood always needs two coats and drinks stain far faster than a previously sealed deck. When in doubt, buy one extra quart: partial cans are nearly impossible to color-match later because the tinting varies between batches."
    ],
    fields: [
{ name: "length", label: "Deck length", unit: "ft", value: 12, min: 1, max: 200, step: 0.5 },
  { name: "width", label: "Deck width", unit: "ft", value: 12, min: 1, max: 100, step: 0.5 },
  { name: "extras", label: "Railings & steps", type: "select", options: [ { value: 0, label: "None" }, { value: 20, label: "Basic railing" }, { value: 35, label: "Railings + steps" }, { value: 50, label: "Full railing, steps & fascia" } ] },
  { name: "coverage", label: "Stain coverage", type: "select", options: [ { value: 300, label: "300 sq ft/gal (smooth wood)" }, { value: 250, label: "250 sq ft/gal" }, { value: 200, label: "200 sq ft/gal (rough wood)" }, { value: 150, label: "150 sq ft/gal (weathered wood)" } ] },
  { name: "coats", label: "Coats", type: "select", options: [ { value: 1, label: "1 coat (refreshing)" }, { value: 2, label: "2 coats (new wood)" } ] }
    ],
    computeJs: `var area = v.length * v.width * (1 + v.extras / 100);
var gallons = area * v.coats / v.coverage;
return [
  { label: "Surface to stain", value: area, unit: "sq ft" },
  { label: "Stain needed", value: Math.ceil(gallons * 4) / 4, unit: "gallons", note: "rounded up to nearest quart" }
];`,
    faqs: [
      { q: "How often should I restain my deck?", a: "Every 2-3 years for semi-transparent stains, and every 3-5 years for solid stains. Water-beading test: if water soaks in rather than beading, it is time to restain." },
      { q: "Should I paint or stain my deck?", a: "Stain penetrates and lets the wood breathe; paint forms a film that can peel on decks. For most outdoor decks, a good semi-transparent or solid stain is the better, lower-maintenance choice." },
      { q: "Can I stain over old stain?", a: "Yes, if the old stain is clean, dry and still bonded. Power-wash, sand lightly, and apply a matching stain. Only strip completely if the old finish is flaking or the wood has grayed badly." }
    ],
    affiliate: [
      "Deck stain and sealer (all tones)",
      "Deck cleaner and brightener",
      "Stain pads, brushes and rollers"
    ],
    related: [
      { slug: "paint-calculator", title: "Paint Calculator", tag: "Gallons of paint for walls" },
      { slug: "gravel-calculator", title: "Gravel Calculator", tag: "Rock for under-deck drainage" },
      { slug: "lumber-calculator", title: "Board Foot Calculator", tag: "Decking board volume" }
    ]
  },
  {
    slug: "drywall-calculator",
    metaTitle: "Drywall Calculator - How Many Sheets Do I Need?",
    description: "Free drywall calculator: figure out the number of 4x8, 4x9, 4x10 or 4x12 drywall sheets needed for any room, including walls and ceiling.",
    h1: "Drywall Calculator",
    lead: "Enter your room size and find out exactly how many drywall sheets you need for walls and ceiling - plus the area you will actually cover.",
    toolName: "drywall calculator",
    howto: [
      "Measure the length, width and height of the room, choose your sheet size, and subtract any large openings (window and door openings). The calculator adds the walls and (optionally) the ceiling, divides by the sheet coverage, and rounds up to whole sheets.",
      "Always add one or two extra sheets to your final count for mistakes, damaged sheets and tricky corners. For the ceiling, plan sheets to run perpendicular to the joists, and use the largest sheet size you can safely carry - fewer seams means less taping and mudding."
    ],
    fields: [
{ name: "length", label: "Room length", unit: "ft", value: 12, min: 1, max: 200, step: 0.5 },
  { name: "width", label: "Room width", unit: "ft", value: 12, min: 1, max: 200, step: 0.5 },
  { name: "height", label: "Wall height", unit: "ft", value: 8, min: 6, max: 20, step: 0.5 },
  { name: "openings", label: "Window & door area", unit: "sq ft", value: 50, min: 0, max: 2000, step: 5 },
  { name: "ceiling", label: "Cover ceiling?", type: "select", options: [ { value: "yes", label: "Yes" }, { value: "no", label: "No" } ] },
  { name: "sheet", label: "Sheet size", type: "select", options: [ { value: 32, label: "4x8 (32 sq ft)" }, { value: 36, label: "4x9 (36 sq ft)" }, { value: 40, label: "4x10 (40 sq ft)" }, { value: 48, label: "4x12 (48 sq ft)" } ] }
    ],
    computeJs: `var walls = 2 * (v.length + v.width) * v.height;
var ceiling = v.ceiling === "yes" ? v.length * v.width : 0;
var area = walls + ceiling - v.openings;
var sheets = Math.ceil(area / v.sheet);
return [
  { label: "Total area (walls + ceiling)", value: area, unit: "sq ft", note: "openings subtracted" },
  { label: "Drywall sheets needed", value: sheets, unit: "sheets", note: v.sheet + " sq ft each" },
  { label: "Waste-safe count (+1)", value: sheets + 1, unit: "sheets", note: "recommended" }
];`,
    faqs: [
      { q: "How much drywall do I need for 1000 square feet?", a: "Divide 1000 by your sheet area: that is about 31 sheets of 4x8 drywall (32 sq ft each), or 25 sheets of 4x10. Add 10% for waste and cuts." },
      { q: "What thickness drywall should I use?", a: "1/2-inch standard drywall for most walls and ceilings, 5/8-inch for fire-rated separations and garage ceilings, and 1/4-inch for skimming over existing walls." },
      { q: "How much does drywall installation cost?", a: "Installed cost (materials + labor) typically runs $1.50-$3.50 per sq ft in the US, depending on location and finish level. DIY sheet prices range from $12-$20 for 4x8." }
    ],
    affiliate: [
      "Drywall sheets (all common sizes)",
      "Drywall screws and joint tape",
      "Joint compound and mud pans"
    ],
    related: [
      { slug: "paint-calculator", title: "Paint Calculator", tag: "Gallons of paint for walls" },
      { slug: "wallpaper-calculator", title: "Wallpaper Calculator", tag: "Rolls needed for a room" },
      { slug: "flooring-calculator", title: "Flooring Calculator", tag: "Cartons of planks needed" }
    ]
  },
  {
    slug: "flooring-calculator",
    metaTitle: "Flooring Calculator - How Many Boxes of Laminate or Vinyl Do I Need?",
    description: "Free flooring calculator: find out how many cartons of laminate, vinyl or hardwood planks you need for any room, with a built-in 5-15% waste allowance.",
    h1: "Flooring Calculator",
    lead: "Find out exactly how many cartons of laminate, vinyl or hardwood planks to buy - including the waste allowance for cuts, so you are never short mid-project.",
    toolName: "flooring calculator",
    howto: [
      "Measure the length and width of the room in feet, check the coverage printed on your flooring box (usually 15-40 sq ft per carton), and pick a waste percentage. For rectangular rooms with standard plank installation, 10% is the safe default - you will use some for end cuts, ripped starter rows and a few replacement planks.",
      "Buying one extra box is always worth it: flooring lots can vary in shade between production runs, and having spare planks makes future repairs trivial. If your room has lots of corners, a diagonal layout, or is longer than about 25 feet, use 15% waste."
    ],
    fields: [
{ name: "length", label: "Room length", unit: "ft", value: 12, min: 1, max: 200, step: 0.5 },
  { name: "width", label: "Room width", unit: "ft", value: 12, min: 1, max: 200, step: 0.5 },
  { name: "coverage", label: "Box coverage", unit: "sq ft per box", value: 20, min: 5, max: 100, step: 1 },
  { name: "waste", label: "Waste allowance", type: "select", options: [ { value: 5, label: "5% (simple layout)" }, { value: 10, label: "10% (recommended)" }, { value: 15, label: "15% (diagonal / many cuts)" } ] }
    ],
    computeJs: `var area = v.length * v.width;
var withWaste = area * (1 + v.waste / 100);
var boxes = Math.ceil(withWaste / v.coverage);
return [
  { label: "Room area", value: area, unit: "sq ft" },
  { label: "Area including waste", value: withWaste, unit: "sq ft", note: v.waste + "% waste" },
  { label: "Cartons needed", value: boxes, unit: "boxes", note: "covers " + (boxes * v.coverage).toFixed(0) + " sq ft" }
];`,
    faqs: [
      { q: "Should I buy extra flooring boxes?", a: "Yes - at least one extra box. Shade variation between production batches means you often cannot match planks later, and repairs are much easier with matching spares on hand." },
      { q: "How do I calculate flooring for an L-shaped room?", a: "Split the room into two rectangles, calculate each separately, and add them together. Then apply your waste percentage to the combined total." },
      { q: "Does underlayment come with laminate flooring?", a: "Many laminate boxes include attached underlayment padding. Vinyl plank flooring sometimes has it built in too - check the product description so you do not double-buy." }
    ],
    affiliate: [
      "Laminate and vinyl plank flooring",
      "Underlayment and vapor barrier",
      "Spacers, tapping block and pull bar kits"
    ],
    related: [
      { slug: "tile-calculator", title: "Tile Calculator", tag: "How many tiles for floor or wall" },
      { slug: "paint-calculator", title: "Paint Calculator", tag: "Gallons of paint for your room" },
      { slug: "lumber-calculator", title: "Board Foot Calculator", tag: "Lumber volume and cost" }
    ]
  },
  {
    slug: "gravel-calculator",
    metaTitle: "Gravel Calculator - How Many Tons of Gravel Do I Need?",
    description: "Free gravel calculator: estimate the cubic yards and tons of crushed stone, pea gravel or river rock needed for a driveway, path or garden bed.",
    h1: "Gravel Calculator",
    lead: "Find out how many cubic yards and tons of gravel, crushed stone or river rock you need for a driveway, path or garden bed - no more guessing when ordering.",
    toolName: "gravel calculator",
    howto: [
      "Measure the length and width of the area in feet and decide the depth in inches (see the FAQ for recommended depths). Choose the material - each type has a different weight per cubic yard - and the calculator returns both cubic yards and tons.",
      "Most suppliers sell gravel by the ton and will quote a delivery fee on top. As a sanity check: a standard pickup truck bed holds about 1.5 tons of gravel, and a tandem dump truck delivers around 18 tons."
    ],
    fields: [
{ name: "length", label: "Area length", unit: "ft", value: 10, min: 1, max: 500, step: 0.5 },
  { name: "width", label: "Area width", unit: "ft", value: 10, min: 1, max: 500, step: 0.5 },
  { name: "depth", label: "Gravel depth", unit: "in", value: 4, min: 1, max: 24, step: 0.5 },
  { name: "material", label: "Material", type: "select", options: [ { value: 1.4, label: "Crushed limestone" }, { value: 1.3, label: "Pea gravel" }, { value: 1.2, label: "River rock" }, { value: 1.35, label: "Decomposed granite" }, { value: 1.25, label: "Sand" } ] }
    ],
    computeJs: `var cuft = v.length * v.width * (v.depth / 12);
var yards = cuft / 27;
var tons = yards * v.material;
return [
  { label: "Volume needed", value: cuft, unit: "cu ft" },
  { label: "Gravel needed", value: Math.ceil(yards * 10) / 10, unit: "cu yd" },
  { label: "Weight needed", value: Math.ceil(tons * 4) / 4, unit: "tons", note: "approx, order this or more" }
];`,
    faqs: [
      { q: "How much does a cubic yard of gravel weigh?", a: "Crushed limestone weighs about 1.4 tons per cubic yard, river rock and pea gravel about 1.2-1.3 tons, and decomposed granite 1.35 tons. Lighter materials like volcanic rock weigh less per yard." },
      { q: "What type of gravel is best for a driveway?", a: "Three layers: 6-8 inches of #2 or #57 crushed stone as base, 2 inches of #57 for the middle, and 1 inch of #411 fines for the top wearing course." },
      { q: "Should I use landscape fabric under gravel?", a: "Yes - geotextile fabric stops gravel from sinking into the soil, prevents weeds, and saves you from topping up the gravel every year." }
    ],
    affiliate: [
      "Crushed stone and gravel (order by the ton)",
      "Landscape fabric and pins",
      "Garden rake and steel edging"
    ],
    related: [
      { slug: "concrete-calculator", title: "Concrete Calculator", tag: "Cubic yards for a slab" },
      { slug: "rebar-calculator", title: "Rebar Calculator", tag: "Steel for the slab below" },
      { slug: "deck-stain-calculator", title: "Deck Stain Calculator", tag: "Stain for the deck above" }
    ]
  },
  {
    slug: "lumber-calculator",
    metaTitle: "Board Foot Calculator - Lumber Volume &amp; Cost",
    description: "Free board foot calculator: convert lumber thickness, width and length into board feet, and calculate total cost for any number of boards.",
    h1: "Board Foot Calculator",
    lead: "Convert lumber dimensions into board feet and see the total cost for any project - framing, decking, or hardwood. Works for both rough and dimensional lumber.",
    toolName: "board foot calculator",
    howto: [
      "Enter the nominal thickness and width in inches, the length in feet, and the number of boards. Optionally add the price per board foot to get a project cost. The formula is (T x W / 12) x L x count.",
      "Note that hardwood is priced in board feet of the actual (rough) dimensions, while framing lumber is usually sold by the piece or linear foot. If your supplier quotes per linear foot, use the linear-feet result instead."
    ],
    fields: [
{ name: "thickness", label: "Board thickness", unit: "in", value: 2, min: 0.5, max: 12, step: 0.25 },
  { name: "width", label: "Board width", unit: "in", value: 4, min: 1, max: 24, step: 0.5 },
  { name: "length", label: "Board length", unit: "ft", value: 8, min: 1, max: 40, step: 0.5 },
  { name: "count", label: "Number of boards", value: 10, min: 1, max: 10000, step: 1 },
  { name: "price", label: "Price per board foot", unit: "$", value: 0.75, min: 0, max: 100, step: 0.01, hint: "leave 0 to skip cost" }
    ],
    computeJs: `var bdft = (v.thickness * v.width / 12) * v.length;
var total = bdft * v.count;
var out = [
  { label: "Board feet per board", value: bdft, unit: "bd ft" },
  { label: "Linear feet per board", value: v.length, unit: "ft" },
  { label: "Total board feet", value: total, unit: "bd ft" }
];
if (v.price > 0) {
  out.push({ label: "Estimated cost", value: total * v.price, unit: "$" });
}
return out;`,
    faqs: [
      { q: "What does a 2x4 actually measure?", a: "A \"2x4\" is 1.5 x 3.5 inches after drying and planing. Board foot pricing for hardwood uses nominal (rough-sawn) size, while framing is priced by the piece." },
      { q: "How much does lumber cost per board foot?", a: "In 2025-2026, framing lumber runs about $0.50-$1.50 per board foot, while hardwood like oak, walnut and cherry ranges from $4-$15 per board foot depending on grade." },
      { q: "What is the cheapest way to buy lumber?", a: "Buy framing lumber in full bundles, choose a less expensive grade of hardwood (No. 2 instead of FAS), and always account for 10-15% waste from knots, warping and cutting errors." }
    ],
    affiliate: [
      "Dimensional lumber (2x4, 2x6, 4x4)",
      "Hardwood boards for fine work",
      "Wood preservative and fasteners"
    ],
    related: [
      { slug: "deck-stain-calculator", title: "Deck Stain Calculator", tag: "Stain for your deck boards" },
      { slug: "rebar-calculator", title: "Rebar Calculator", tag: "Steel reinforcement" },
      { slug: "concrete-calculator", title: "Concrete Calculator", tag: "Footings for the structure" }
    ]
  },
  {
    slug: "paint-calculator",
    metaTitle: "Paint Calculator - How Much Paint Do I Need? (Walls + Ceiling)",
    description: "Free paint calculator: enter room dimensions, windows and doors, and get the exact gallons of paint needed for walls in seconds. Includes per-coat estimates.",
    h1: "Paint Calculator",
    lead: "Enter your room dimensions below and get an instant estimate of how many gallons of paint you need for the walls. No guesswork, no leftover cans.",
    toolName: "paint calculator",
    howto: [
      "Measure your room's length, width and ceiling height in feet, count the doors and windows (they subtract from the paintable area), and pick how many coats you plan to apply. The calculator works out the total wall area and divides it by the standard coverage of one gallon (350 sq ft per coat). The result is rounded up to the nearest half-gallon so you always buy slightly more than you need - painting is far cheaper than a second trip to the store.",
      "Tip: if you are also painting the ceiling, add about 25-30% more paint or use the same dimensions with the ceiling area added. Textured walls (knockdown, orange peel) absorb 10-20% more paint than smooth drywall."
    ],
    fields: [
{ name: "length", label: "Room length", unit: "ft", value: 12, min: 1, max: 200, step: 0.5 },
  { name: "width", label: "Room width", unit: "ft", value: 10, min: 1, max: 200, step: 0.5 },
  { name: "height", label: "Ceiling height", unit: "ft", value: 8, min: 6, max: 20, step: 0.5 },
  { name: "windows", label: "Windows", value: 2, min: 0, max: 20, step: 1 },
  { name: "doors", label: "Doors", value: 1, min: 0, max: 20, step: 1 },
  { name: "coats", label: "Coats of paint", type: "select", options: [ { value: 1, label: "1 coat" }, { value: 2, label: "2 coats" }, { value: 3, label: "3 coats" } ] }
    ],
    computeJs: `var area = 2 * (v.length + v.width) * v.height - v.windows * 15 - v.doors * 21;
var gallons = area * v.coats / 350;
return [
  { label: "Wall area to cover", value: area, unit: "sq ft" },
  { label: "Paint needed", value: Math.ceil(gallons * 2) / 2, unit: "gallons", note: "rounded up to nearest half gallon" }
];`,
    faqs: [
      { q: "How do I calculate the wall area of a room?", a: "Multiply the perimeter of the room (length + width, doubled) by the ceiling height: 2 x (L + W) x H. Subtract 15 sq ft for each window and 21 sq ft for each standard door." },
      { q: "Is 2 coats of paint always necessary?", a: "Two coats give a more durable, even finish and better color depth. One coat is usually enough only for touch-ups or when repainting with the exact same color." },
      { q: "Can I use this calculator for exterior painting?", a: "Yes - use the same formula but remember exterior paint covers slightly less (about 300-320 sq ft per gallon) because of the rough surface of siding and stucco." }
    ],
    affiliate: [
      "Interior paint - popular brands and price ranges",
      "Painter's tape and drop cloths",
      "Roller sets and extension poles"
    ],
    related: [
      { slug: "drywall-calculator", title: "Drywall Calculator", tag: "How many sheets for your room" },
      { slug: "flooring-calculator", title: "Flooring Calculator", tag: "Laminate & vinyl cartons needed" },
      { slug: "concrete-calculator", title: "Concrete Calculator", tag: "Cubic yards and bag count" }
    ]
  },
  {
    slug: "rebar-calculator",
    metaTitle: "Rebar Calculator - How Many Bars &amp; Spacing for a Concrete Slab",
    description: "Free rebar calculator: find out how many rebar bars you need and their total length for a concrete slab, driveway or footing based on spacing.",
    h1: "Rebar Calculator",
    lead: "Calculate how many rebar bars you need for a slab or footing, and the total linear feet of steel - for both single and double-direction (grid) reinforcement.",
    toolName: "rebar calculator",
    howto: [
      "Enter the length and width of the concrete pour, the spacing between bars, and choose single or grid reinforcement. The calculator divides the run by the spacing, adds one for the starting bar, and multiplies by the bar length to give you total linear feet.",
      "For a one-way layout (typical for small footings) use \"single direction\". For slabs, driveways and patios, use \"grid\" - bars run both ways, roughly doubling the amount of steel. Standard practice is #3 bars (3/8 inch) at 12-18 inches on center for residential work."
    ],
    fields: [
{ name: "length", label: "Slab length", unit: "ft", value: 10, min: 1, max: 300, step: 0.5 },
  { name: "width", label: "Slab width", unit: "ft", value: 10, min: 1, max: 300, step: 0.5 },
  { name: "spacing", label: "Bar spacing", unit: "in", value: 12, min: 4, max: 48, step: 1 },
  { name: "direction", label: "Reinforcement", type: "select", options: [ { value: "grid", label: "Grid (both directions)" }, { value: "single", label: "Single direction" } ] }
    ],
    computeJs: `var barsPerRun = Math.ceil((v.length * 12) / v.spacing) + 1;
var barsPerWidth = Math.ceil((v.width * 12) / v.spacing) + 1;
var bars, feet;
if (v.direction === "grid") {
  bars = barsPerRun + barsPerWidth;
  feet = barsPerRun * v.width + barsPerWidth * v.length;
} else {
  bars = barsPerRun;
  feet = barsPerRun * v.width;
}
return [
  { label: "Rebar bars needed", value: bars, unit: "bars" },
  { label: "Total rebar length", value: feet, unit: "linear ft" },
  { label: "Bars along length", value: barsPerRun, unit: "bars" }
];`,
    faqs: [
      { q: "How many linear feet of rebar is in a 10x10 slab?", a: "With #3 rebar at 12-inch spacing in both directions, a 10x10 slab needs about 10 bars of 10 feet each way - 220 linear feet total including both directions." },
      { q: "What is the difference between #3 and #4 rebar?", a: "#3 rebar is 3/8-inch diameter and #4 is 1/2-inch. Use #4 (or larger) for footings, foundations and structural pours; #3 is fine for most residential flat slabs." },
      { q: "Do I need rebar chairs or spacers?", a: "Yes - rebar must sit in the middle third of the slab, not at the bottom. Use plastic chairs every 3-4 feet so the bar is fully embedded in concrete and protected from moisture." }
    ],
    affiliate: [
      "Rebar (all common sizes)",
      "Rebar chairs and wire ties",
      "Concrete mix and finishing tools"
    ],
    related: [
      { slug: "concrete-calculator", title: "Concrete Calculator", tag: "Cubic yards and bags needed" },
      { slug: "gravel-calculator", title: "Gravel Calculator", tag: "Tons of base material" },
      { slug: "lumber-calculator", title: "Board Foot Calculator", tag: "Lumber volume and cost" }
    ]
  },
  {
    slug: "tile-calculator",
    metaTitle: "Tile Calculator - How Many Tiles Do I Need for Floor or Wall?",
    description: "Free tile calculator: find out the number of floor or wall tiles you need for any room, including grout lines and the standard 10-15% waste for cuts and breakage.",
    h1: "Tile Calculator",
    lead: "Enter your room size and tile dimensions to find out exactly how many tiles to buy - including waste for cuts, breakage and grout lines.",
    toolName: "tile calculator",
    howto: [
      "Measure the length and width of the floor or wall area, pick your tile size, and choose a waste percentage. The calculator converts the room area into square inches, divides by the tile area, and applies the waste allowance to give a total tile count.",
      "Use 10% waste for simple rectangular rooms with a straight layout. Choose 15% if you are installing diagonally, have lots of cutouts, or are tiling a room with many corners - every cut edge needs a full tile of origin."
    ],
    fields: [
{ name: "length", label: "Room length", unit: "ft", value: 10, min: 1, max: 200, step: 0.5 },
  { name: "width", label: "Room width", unit: "ft", value: 10, min: 1, max: 200, step: 0.5 },
  { name: "tile", label: "Tile size", type: "select", options: [ { value: 36, label: "6x6 (0.25 sq ft)" }, { value: 144, label: "12x12 (1 sq ft)" }, { value: 324, label: "18x18 (2.25 sq ft)" }, { value: 576, label: "24x24 (4 sq ft)" } ] },
  { name: "waste", label: "Waste allowance", type: "select", options: [ { value: 10, label: "10% (straight layout)" }, { value: 15, label: "15% (diagonal / many cuts)" } ] }
    ],
    computeJs: `var areaSqft = v.length * v.width;
var totalSqft = areaSqft * (1 + v.waste / 100);
var tiles = Math.ceil(totalSqft * 144 / v.tile);
return [
  { label: "Room area", value: areaSqft, unit: "sq ft" },
  { label: "Area with waste", value: totalSqft, unit: "sq ft", note: v.waste + "% waste" },
  { label: "Tiles needed", value: tiles, unit: "tiles", note: "rounded up" }
];`,
    faqs: [
      { q: "Should I add extra tile for waste?", a: "Always. Plan on 10% for a simple layout and 15% for diagonal or irregular rooms. You will also want a few spare tiles years later for repairs - matching discontinued tile is nearly impossible." },
      { q: "What size grout line should I use?", a: "1/16 to 1/8 inch for rectified (precision-cut) large format tiles, 1/4 to 1/2 inch for hand-made and stone tiles. Larger grout joints hide small variations in tile size." },
      { q: "Should I buy tile by the box or by the piece?", a: "By the box - but always buy whole boxes to reach your count. Check the box coverage (usually 8-15 sq ft) and round up to the next whole box." }
    ],
    affiliate: [
      "Floor and wall tile (all sizes)",
      "Tile spacers, trowels and grout",
      "Wet tile saws and cutters"
    ],
    related: [
      { slug: "flooring-calculator", title: "Flooring Calculator", tag: "Plank cartons for the room" },
      { slug: "concrete-calculator", title: "Concrete Calculator", tag: "Backer board base material" },
      { slug: "paint-calculator", title: "Paint Calculator", tag: "Paint for the surrounding walls" }
    ]
  },
  {
    slug: "wallpaper-calculator",
    metaTitle: "Wallpaper Calculator - How Many Rolls Do I Need?",
    description: "Free wallpaper calculator: work out how many rolls of wallpaper you need for any room, for US single rolls, US double rolls or European rolls.",
    h1: "Wallpaper Calculator",
    lead: "Find out exactly how many rolls of wallpaper you need for a room - with US single, double and European roll sizes, and pattern-repeat allowance.",
    toolName: "wallpaper calculator",
    howto: [
      "Measure the length, width and ceiling height of the room, subtract your window and door area, and pick the roll type. The calculator multiplies the perimeter by the height and divides by the usable coverage per roll.",
      "Patterned wallpaper needs more material: with a large pattern repeat you lose up to 20% to matching cuts, so select a roll type and check \"patterned\" to add the standard 15% allowance. One extra roll on top of that is the safe rule."
    ],
    fields: [
{ name: "length", label: "Room length", unit: "ft", value: 12, min: 1, max: 200, step: 0.5 },
  { name: "width", label: "Room width", unit: "ft", value: 12, min: 1, max: 200, step: 0.5 },
  { name: "height", label: "Wall height", unit: "ft", value: 8, min: 6, max: 20, step: 0.5 },
  { name: "openings", label: "Window & door area", unit: "sq ft", value: 50, min: 0, max: 2000, step: 5 },
  { name: "roll", label: "Roll type", type: "select", options: [ { value: 28, label: "US single roll (28 sq ft)" }, { value: 56, label: "US double roll (56 sq ft)" }, { value: 57, label: "European roll (10m x 0.53m)" } ] },
  { name: "pattern", label: "Pattern", type: "select", options: [ { value: 0, label: "Plain / no match" }, { value: 15, label: "Patterned (adds 15%)" } ] }
    ],
    computeJs: `var area = 2 * (v.length + v.width) * v.height - v.openings;
var adjusted = area * (1 + v.pattern / 100);
var rolls = Math.ceil(adjusted / v.roll);
return [
  { label: "Wall area", value: area, unit: "sq ft", note: "openings subtracted" },
  { label: "Rolls needed", value: rolls, unit: "rolls", note: "includes " + (v.pattern === 0 ? "no" : "15%") + " pattern allowance" },
  { label: "Safe total (+1)", value: rolls + 1, unit: "rolls", note: "recommended" }
];`,
    faqs: [
      { q: "How do I measure for wallpaper?", a: "Measure each wall's width and add them together for the perimeter, then multiply by the wall height. Subtract 15 sq ft per window and 21 sq ft per door, then divide by the roll coverage." },
      { q: "What is a double roll of wallpaper?", a: "Most wallpaper is actually sold as double rolls (56 usable sq ft) but priced per single roll. Check your order: many shops list per single roll but ship double rolls." },
      { q: "How much does wallpaper installation cost?", a: "Professional installation typically costs $2-$4 per sq ft or $25-$60 per roll. DIY is very doable with pre-pasted wallpaper, but needs careful surface prep." }
    ],
    affiliate: [
      "Wallpaper (all patterns and styles)",
      "Wallpaper paste and primer",
      "Smoothing tools and seam rollers"
    ],
    related: [
      { slug: "paint-calculator", title: "Paint Calculator", tag: "Paint instead of paper?" },
      { slug: "drywall-calculator", title: "Drywall Calculator", tag: "Walls behind the paper" },
      { slug: "flooring-calculator", title: "Flooring Calculator", tag: "Floor to match the walls" }
    ]
  },
];
