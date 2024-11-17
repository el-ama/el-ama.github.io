let flashcards = [];
let currentCardIndex = 0;
let memorizedCards = new Set();
let testMode = false;

const flashcardEl = document.getElementById('flashcard');
const frontContentEl = document.getElementById('frontContent');
const backContentEl = document.getElementById('backContent');
const cardNumberEl = document.getElementById('cardNumber');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const testModeButton = document.getElementById('testModeButton');
const resetButton = document.getElementById('resetButton');
const noCardsMessage = document.getElementById('noCardsMessage');
const memorizedContainer = document.getElementById('memorizedContainer');
const memorizedCheckbox = document.getElementById('memorizedCheckbox');

const flashcardsData = [
    {
        "front": "What are the main types of roads in Spain?",
        "back": "• Interurban roads (highways or 'carreteras')\n\n• Urban roads\n\n• Crossings"
    },
    {
        "front": "Where are 'carreteras' (highways) located?",
        "back": "• Outside urban areas (interurban)"
    },
    {
        "front": "What are the three main types of interurban roads in Spain?",
        "back": "• Autopistas (Motorways)\n\n• Autovías (Dual Carriageways)\n\n• Conventional Highways"
    },
    {
        "front": "What is the minimum speed capability required for vehicles on autopistas and autovías?",
        "back": "• 60 km/h"
    },
    {
        "front": "Key features of autopistas (motorways) in Spain?",
        "back": "• Separate carriageways\n• Median strips\n• No level crossings\n• Limited access\n• Usually tolled"
    },
    {
        "front": "Key features of autovías (dual carriageways) in Spain?",
        "back": "• Separate carriageways\n• Median strips\n• Some level crossings possible\n• Less restricted access\n• Always free"
    },
    {
        "front": "What is a conventional highway in Spain?",
        "back": "• Any other interurban road\n• No special limitations\n• Single or dual carriageways\n• May have level crossings"
    },
    {
        "front": "Which vehicles/users are NOT allowed on autopistas and autovías?",
        "back": "• Bicycles\n• Mopeds\n• Vehicles for people with reduced mobility\n• Pedestrians\n• Animals"
    },
    {
        "front": "Are motorcycles allowed on autopistas and autovías?",
        "back": "• Yes, motorcycles are allowed on autopistas and autovías"
    },
    {
        "front": "Can cyclists use the hard shoulder on autopistas and autovías?",
        "back": "• Cyclists over 14 years old may use the hard shoulder\n• Only when not prohibited by signage\n• Only on certain sections where it's explicitly allowed"
    },
    {
        "front": "On dual carriageways (autopistas/autovías) with 2 lanes in each direction, where should cars and vehicles >3.5t drive?",
        "back": "• In the right lane\n• This applies both inside and outside urban areas"
    },
    {
        "front": "On dual carriageways (autopistas/autovías) with 3 lanes in each direction, where should cars and vehicles >3.5t drive?",
        "back": "• In the right lane\n• Central lane for overtaking or turning left\n• Never in the left lane\n• Applies both inside and outside urban areas"
    },
    {
        "front": "On conventional highways outside urban areas with more than one lane in the same direction, where should cars drive?",
        "back": "• In the right lane\n• Other lanes can be used when necessary"
    },
    {
        "front": "On conventional highways outside urban areas with 3+ lanes, where should lorries, minivans, and special vehicles >3.5t drive?",
        "back": "• In the right lane\n• Adjacent lane allowed exceptionally\n• Never use remaining lanes\n• Change lanes only when traffic requires"
    },    
    {
        "front": "What are the main types of roads in Spain?",
        "back": "• Interurban roads (highways or 'carreteras')\n\n• Urban roads\n\n• Crossings"
    },
    {
        "front": "Where are 'carreteras' (highways) located?",
        "back": "• Outside urban areas (interurban)"
    },
    {
        "front": "What are the three main types of interurban roads in Spain?",
        "back": "• Autopistas (Motorways)\n\n• Autovías (Dual Carriageways)\n\n• Conventional Highways"
    },
    {
        "front": "What is the minimum speed capability required for vehicles on autopistas and autovías?",
        "back": "• 60 km/h"
    },
    {
        "front": "Key features of autopistas (motorways) in Spain?",
        "back": "• Separate carriageways\n• Median strips\n• No level crossings\n• Limited access\n• Usually tolled"
    },
    {
        "front": "Key features of autovías (dual carriageways) in Spain?",
        "back": "• Separate carriageways\n• Median strips\n• Some level crossings possible\n• Less restricted access\n• Always free"
    },
    {
        "front": "What is a conventional highway in Spain?",
        "back": "• Any other interurban road\n• No special limitations\n• Single or dual carriageways\n• May have level crossings"
    },
    {
        "front": "Which vehicles/users are NOT allowed on autopistas and autovías?",
        "back": "• Bicycles\n• Mopeds\n• Vehicles for people with reduced mobility\n• Pedestrians\n• Animals"
    },
    {
        "front": "Are motorcycles allowed on autopistas and autovías?",
        "back": "• Yes, motorcycles are allowed on autopistas and autovías"
    },
    {
        "front": "Can cyclists use the hard shoulder on autopistas and autovías?",
        "back": "• Cyclists over 14 years old may use the hard shoulder\n• Only when not prohibited by signage\n• Only on certain sections where it's explicitly allowed"
    },
    {
        "front": "On dual carriageways (autopistas/autovías) with 2 lanes in each direction, where should cars and vehicles >3.5t drive?",
        "back": "• In the right lane\n• This applies both inside and outside urban areas"
    },
    {
        "front": "On dual carriageways (autopistas/autovías) with 3 lanes in each direction, where should cars and vehicles >3.5t drive?",
        "back": "• In the right lane\n• Central lane for overtaking or turning left\n• Never in the left lane\n• Applies both inside and outside urban areas"
    },
    {
        "front": "On conventional highways outside urban areas with more than one lane in the same direction, where should cars drive?",
        "back": "• In the right lane\n• Other lanes can be used when necessary"
    },
    {
        "front": "On conventional highways outside urban areas with 3+ lanes, where should lorries, minivans, and special vehicles >3.5t drive?",
        "back": "• In the right lane\n• Adjacent lane allowed exceptionally\n• Never use remaining lanes\n• Change lanes only when traffic requires"
    },
    {
        "front": "How should you drive around refuge islands or guidance devices on two-way streets?",
        "back": "• Drive on the right side of these elements\n• Leave them to your left\n• This applies when they separate opposite directions of traffic"
    },
    {
        "front": "How can you drive around refuge islands or guidance devices on one-way streets or within a single direction of travel?",
        "back": "• Driving is permitted on both the left and right sides of these elements\n• This applies specifically to one-way streets or within the corresponding part of a single direction of travel"
    },
    {
        "front": "What vehicles can use lanes reserved for buses?",
        "back": "• Public transport vehicles\n• Taxis (when 'TAXI' is visible on the signage)\n• Other vehicles may use discontinuous sections for specific maneuvers (not for parking, stopping, changing direction, or overtaking)"
    },
    {
        "front": "What are the rules for High Occupancy Vehicle (HOV) lanes?",
        "back": "• Can be permanent or temporary\n• For vehicles transporting people with Maximum Authorized Mass (MMA) ≤ 3.5 tonnes\n• Must have minimum number of occupants as specified for that section\n• Also usable by:\n  - Buses\n  - Motorcycles\n  - Cars with handicapped signs"
    },
    {
        "front": "What are the rules for driving in reversible lanes?",
        "back": "• Identified by double broken line markings\n• Headlights must be used at all times (day and night)\n• Driving in the left reversible lane is forbidden\n• Direction of traffic can change based on traffic flow needs"
    },
    {
        "front": "What are the main types of roads in Spain?",
        "back": "• Interurban roads (highways or 'carreteras')\n\n• Urban roads\n\n• Crossings"
    },
    {
        "front": "Where are 'carreteras' (highways) located?",
        "back": "• Outside urban areas (interurban)"
    },
    {
        "front": "What are the three main types of interurban roads in Spain?",
        "back": "• Autopistas (Motorways)\n\n• Autovías (Dual Carriageways)\n\n• Conventional Highways"
    },
    {
        "front": "What is the minimum speed capability required for vehicles on autopistas and autovías?",
        "back": "• 60 km/h"
    },
    {
        "front": "Key features of autopistas (motorways) in Spain?",
        "back": "• Separate carriageways\n• Median strips\n• No level crossings\n• Limited access\n• Usually tolled"
    },
    {
        "front": "Key features of autovías (dual carriageways) in Spain?",
        "back": "• Separate carriageways\n• Median strips\n• Some level crossings possible\n• Less restricted access\n• Always free"
    },
    {
        "front": "What is a conventional highway in Spain?",
        "back": "• Any other interurban road\n• No special limitations\n• Single or dual carriageways\n• May have level crossings"
    },
    {
        "front": "Which vehicles/users are NOT allowed on autopistas and autovías?",
        "back": "• Bicycles\n• Mopeds\n• Vehicles for people with reduced mobility\n• Pedestrians\n• Animals"
    },
    {
        "front": "Are motorcycles allowed on autopistas and autovías?",
        "back": "• Yes, motorcycles are allowed on autopistas and autovías"
    },
    {
        "front": "Can cyclists use the hard shoulder on autopistas and autovías?",
        "back": "• Cyclists over 14 years old may use the hard shoulder\n• Only when not prohibited by signage\n• Only on certain sections where it's explicitly allowed"
    },
    {
        "front": "On dual carriageways (autopistas/autovías) with 2 lanes in each direction, where should cars and vehicles >3.5t drive?",
        "back": "• In the right lane\n• This applies both inside and outside urban areas"
    },
    {
        "front": "On dual carriageways (autopistas/autovías) with 3 lanes in each direction, where should cars and vehicles >3.5t drive?",
        "back": "• In the right lane\n• Central lane for overtaking or turning left\n• Never in the left lane\n• Applies both inside and outside urban areas"
    },
    {
        "front": "On conventional highways outside urban areas with more than one lane in the same direction, where should cars drive?",
        "back": "• In the right lane\n• Other lanes can be used when necessary"
    },
    {
        "front": "On conventional highways outside urban areas with 3+ lanes, where should lorries, minivans, and special vehicles >3.5t drive?",
        "back": "• In the right lane\n• Adjacent lane allowed exceptionally\n• Never use remaining lanes\n• Change lanes only when traffic requires"
    },
    {
        "front": "What are the three types of circumstantial lanes in Spain?",
        "back": "• Revertive lanes\n• Additional lanes\n• Contraflow lanes"
    },
    {
        "front": "What are the general rules for circumstantial lanes in Spain?",
        "back": "• Headlights must be used (day and night)\n• Speed limits may apply (typically between 60-80 km/h, but can vary)\n• Drivers must not cross or change the line formed by traffic barriers\n• Specific rules may apply to each type of circumstantial lane"
    },
    {
        "front": "What are the rules for contraflow lanes in Spain?",
        "back": "• Designed to increase traffic flow\n• Only motorcycles and vehicles without trailers are permitted\n• Headlights must be used\n• Speed limits typically between 60-80 km/h (may vary)\n• Follow the same rules as additional circumstantial lanes"
    },
    {
        "front": "What are the rules for using the hard shoulder (arcén) in Spain?",
        "back": "• Hard shoulders are generally not for driving\n• Exceptions for specific vehicles:\n  - Bicycles, mopeds, and slow-moving vehicles must use the hard shoulder if present and passable\n  - Agricultural vehicles and machinery\n  - Road maintenance vehicles\n• Emergency use:\n  - For breakdowns or emergencies\n  - To avoid accidents\n• Temporary use when directed by traffic signs or police"
    },
    {
        "front": "Which vehicles must use the hard shoulder in Spain when it's present and passable?",
        "back": "• Bicycles\n• Mopeds\n• Slow-moving vehicles (e.g., animal-drawn vehicles)\n• Agricultural vehicles and machinery"
    },
    {
        "front": "What are the rules for vehicles using the hard shoulder in Spain regarding driving in parallel and overtaking?",
        "back": "• Driving in parallel on the hard shoulder is forbidden, except for bicycles and mopeds\n• Overtaking on the hard shoulder is forbidden if it takes more than 15 seconds, except for bicycles"
    },
    {
        "front": "What are the rules for maintaining stopping gaps in Spain?",
        "back": "• Maintain a gap large enough to allow for emergency braking\n• Leave enough space to allow other vehicles to overtake\n• Vehicles over 3.5 tonnes and longer than 10 meters must maintain a gap of at least 50 meters from the vehicle in front (outside urban areas)"
    },
    {
        "front": "What is the required safety distance in tunnels when not overtaking in Spain?",
        "back": "• Maintain a safety distance of at least 100 meters or 4 seconds from the vehicle in front"
    },
    {
        "front": "What are the speed limits (km/h) on motorways and dual carriageways in Spain for different vehicle types?",
        "back": "• Cars, motorcycles, motorhomes ≤3.5t, pickups: 60-120\n\n• Buses and adapted mixed vehicles: 60-100\n\n• Trucks, vans, motorhomes >3.5t, articulated vehicles (e.g., with trailers): 60-90"
    },
    {
        "front": "What are the speed limits (km/h) on conventional highways and single carriageway roads in Spain for different vehicle types?",
        "back": "• Cars, motorcycles, motorhomes ≤3.5t, pickups: 45-90\n\n• Buses and adapted mixed vehicles: 45-90\n\n• Trucks, vans, motorhomes >3.5t, articulated vehicles (e.g., with trailers): 40-80"
    },
    {
        "front": "What are the speed limits (km/h) on different types of urban roads in Spain?",
        "back": "• Roads with a single lane and sidewalk: 20\n\n• Roads with one lane per direction: 30\n\n• Roads with 2 or more lanes per direction: 50\n\n• Urban sections of highways/motorways: 80 (unless otherwise indicated)"
    },
    {
        "front": "What are the speed limits (km/h) for special vehicles in Spain?",
        "back": "• Tractors and vehicles without brake lights: 25\n\n• Special vehicles capable of > 60 km/h: 70\n\n• Other special vehicles: 40\n\n• Quadricycles and three-wheeled vehicles: 70\n\n• Cycles and mopeds: 45"
    },
    {
        "front": "What are the speed limit reductions for certain vehicles in Spain?",
        "back": "• Vehicles carrying children or dangerous goods: -10 km/h from the generic maximum speed\n\n• Motorcycles, three-wheeled vehicles, and mopeds when towing: -10% from their maximum speed limit"
    },
    {
        "front": "What are the general priority rules at junctions in Spain?",
        "back": "• Priority is determined by traffic signs\n\n• If no signs, vehicles approaching from the right have right of way\n\n• Exceptions (vehicles that have priority):\n  - Those on a main road over those on a secondary road\n  - Those already in a roundabout over those entering\n  - Those on motorways/dual carriageways over those joining\n  - Those on a public road over those joining from a private road\n\n• Do not enter a junction if your vehicle might obstruct other traffic"
    },
    {
        "front": "What are the priority rules regarding cyclists in Spain?",
        "back": "Motor vehicle drivers must give way to cyclists:\n\n• When cyclists are crossing a properly signaled cycle lane, cycle path, or hard shoulder\n\n• When turning, if there's a cyclist at or near the junction\n\n• When the lead cyclist of a group has entered a crossing or roundabout (the group is considered a 'mobile unit')\n\nIn all other cases, general priority rules apply"
    },
    {
        "front": "What are the rules for priority vehicles in Spain?",
        "back": "• Only considered priority vehicles when in emergency response\n\n• Must signal presence with flashing beacons and audible warnings\n\n• Have priority over all other vehicles\n\n• May exceed speed limits when necessary"
    },
    {
        "front": "What are the priority rules for road narrowing in Spain?",
        "back": "In the absence of signs:\n\n• Priority given to the vehicle that entered first\n\n• If unclear, priority given to the vehicle with more difficult maneuver\n\n• On steep slopes, uphill vehicles have priority\n\n• Exception: Downhill vehicle has priority if it reaches a passing point first"
    },
   {
        "front": "What are the speed limit reductions for certain vehicles in Spain?",
        "back": "• Vehicles carrying children or dangerous goods: -10 km/h from the generic maximum speed\n\n• Motorcycles, three-wheeled vehicles, and mopeds when towing: -10% from their maximum speed limit"
    },
    {
        "front": "What are the general priority rules at junctions in Spain?",
        "back": "• Priority is determined by traffic signs\n\n• If no signs, vehicles approaching from the right have right of way\n\n• Exceptions (vehicles that have priority):\n  - Those on a main road over those on a secondary road\n  - Those already in a roundabout over those entering\n  - Those on motorways/dual carriageways over those joining\n  - Those on a public road over those joining from a private road\n\n• Do not enter a junction if your vehicle might obstruct other traffic"
    },
    {
        "front": "What are the priority rules regarding cyclists in Spain?",
        "back": "Motor vehicle drivers must give way to cyclists:\n\n• When cyclists are crossing a properly signaled cycle lane, cycle path, or hard shoulder\n\n• When turning, if there's a cyclist at or near the junction\n\n• When the lead cyclist of a group has entered a crossing or roundabout (the group is considered a 'mobile unit')\n\nIn all other cases, general priority rules apply"
    },
    {
        "front": "What are the rules for priority vehicles in Spain?",
        "back": "• Only considered priority vehicles when in emergency response\n\n• Must signal presence with flashing beacons and audible warnings\n\n• Have priority over all other vehicles\n\n• May exceed speed limits when necessary"
    },
    {
        "front": "What are the priority rules for road narrowing in Spain?",
        "back": "In the absence of signs:\n\n• Priority given to the vehicle that entered first\n\n• If unclear, priority given to the vehicle with more difficult maneuver\n\n• On steep slopes, uphill vehicles have priority\n\n• Exception: Downhill vehicle has priority if it reaches a passing point first"
    },
    {
        "front": "What are the key rules for joining traffic in Spain?",
        "back": "• Give way if other drivers' position, distance, course, or speed interferes\n• Always signal when joining\n• When exiting property/private path:\n  - Drive at a speed allowing complete stop\n  - Be prepared to give way to drivers from right or left\n• When using acceleration lane:\n  - Ensure no danger at beginning of lane\n  - Give way to all vehicles in lane you wish to join\n  - Be prepared to stop if necessary\n  - Accelerate to suitable speed by end of lane"
    },
    {
        "front": "How should drivers facilitate others joining traffic in Spain?",
        "back": "• Facilitate maneuvers of drivers joining traffic as much as possible\n• For buses pulling away from signaled stops in urban areas:\n  - Pull over to the side when possible\n  - Slow down when possible with safety\n  - Stop if necessary to let them join"
    },
    {
        "front": "What are the general rules for overtaking in Spain?",
        "back": "• Ensure the driver ahead is not signaling to maneuver or change lane\n• Don't overtake if others in your lane have begun overtaking\n• To signal intention to overtake:\n  - Flash headlights or use horn (only outside urban areas)\n• General rule: Overtake on the left\n• Keep lateral distance of at least 1.5 meters when overtaking:\n  - Fragile users\n  - Immobilized vehicles\n  - Road assistance vehicles\n  - Two-wheeled vehicles (outside urban areas)"
    },
    {
        "front": "When is overtaking on the right permitted in Spain?",
        "back": "Overtaking on the right is permitted in exceptional circumstances:\n\n• When the vehicle ahead signals intention to turn left or stop on the left side\n• In urban areas on roads with multiple lanes in the same direction, bordered by markings\n• On two-way roads with tramways running in the center"
    },
    {
        "front": "What are the rules for overtaking in specific road situations in Spain?",
        "back": "• On two-way roads with three lanes (broken lines):\n  - Use middle lane when free of oncoming traffic\n• On roads with multiple lanes in each direction:\n  - May stay in overtaking lane if not disturbing traffic behind\n• If problem develops while overtaking:\n  - Slow down immediately\n  - Return to right lane using right indicator"
    },
    {
        "front": "What are the lateral distance rules when overtaking in Spain?",
        "back": "• Keep at least 1.5 meters when overtaking:\n  - Fragile users\n  - Pedestrians\n  - Animals\n  - Two-wheeled vehicles\n  - Immobilized vehicles on the road\n  - Road assistance vehicles during operations\n\n• Outside urban areas, maintain 1.5 meters when a two-wheeled vehicle overtakes other vehicles\n\n• In urban areas, allow a safe lateral distance proportional to speed, road width, and features\n\n• When overtaking cyclists or mopeds on multi-lane roads, a complete lane change is mandatory"
    },
    {
        "front": "When is overtaking prohibited in Spain?",
        "back": "Overtaking is prohibited:\n\n• Where signaled by road signs or road markings\n• When already overtaking another vehicle\n• When visibility is limited (bends, road humps, etc.)\n• Behind vehicles obscuring the road ahead\n• At level crossings and their proximity (except two-wheeled vehicles with good lateral visibility)\n• At pedestrian crossings and their vicinity (unless at very slow speed)\n• When endangering or hindering cyclists traveling in the opposite direction"
    },
    {
        "front": "What are the rules for behavior during and after overtaking in Spain?",
        "back": "• After overtaking, return to the right-hand lane\n\n• Overtaken vehicle must:\n  - Stick to the right without invading hard shoulder\n  - Not increase speed\n  - Slow down if danger arises\n  - Facilitate return if overtaking vehicle slows down\n\n• Long/large vehicles unable to pull right should:\n  - Signal with arm or right indicator\n  - Drop back or use hard shoulder if safe overtaking is impossible"
    },
    {
        "front": "What are the general rules for overtaking in Spain?",
        "back": "• Ensure the driver ahead is not signaling to maneuver or change lane\n• Don't overtake if others in your lane have begun overtaking\n• To signal intention to overtake:\n  - Flash headlights or use horn (only outside urban areas)\n• General rule: Overtake on the left\n• Keep lateral distance of at least 1.5 meters when overtaking:\n  - Fragile users\n  - Immobilized vehicles\n  - Road assistance vehicles\n  - Two-wheeled vehicles (outside urban areas)"
    },
    {
        "front": "When is overtaking on the right permitted in Spain?",
        "back": "Overtaking on the right is permitted in exceptional circumstances:\n\n• When the vehicle ahead signals intention to turn left or stop on the left side\n• In urban areas on roads with multiple lanes in the same direction, bordered by markings\n• On two-way roads with tramways running in the center"
    },
    {
        "front": "What are the rules for overtaking in specific road situations in Spain?",
        "back": "• On two-way roads with three lanes (broken lines):\n  - Use middle lane when free of oncoming traffic\n• On roads with multiple lanes in each direction:\n  - May stay in overtaking lane if not disturbing traffic behind\n• If problem develops while overtaking:\n  - Slow down immediately\n  - Return to right lane using right indicator"
    },
   {
        "front": "In which additional situations is overtaking prohibited in Spain?",
        "back": "Overtaking is prohibited:\n\n• At junctions with cycle lanes and in their proximity\n\n• In tunnels, underground passages, and sections marked with 'road tunnel' signs when there is only one lane for each direction of traffic\n\n• In any situation where there is only one lane per direction, regardless of whether it's a tunnel or not"
    },
    {
        "front": "When is it allowed to cross a continuous line for overtaking in Spain?",
        "back": "Even when overtaking is generally forbidden, you may cross a continuous line to overtake:\n\n• Slow and fragile users (cyclists, mopeds, pedestrians, animals)\n• Obstacles or stationary vehicles due to breakdown or accident\n\nConditions:\n• Only when speed allows for a safe maneuver\n• After ensuring there is no danger\n• Not allowed if obstruction is due to normal traffic conditions"
    },
    {
        "front": "What are the rules for overtaking cyclists in Spain?",
        "back": "• You are not always allowed to overtake cyclists\n\n• General rules:\n  - Maintain at least 1.5 meters lateral distance when overtaking\n  - On roads with more than one lane per direction, change lanes completely\n\n• Overtaking cyclists is prohibited:\n  - Where overtaking is generally forbidden (e.g., solid lines, poor visibility)\n  - At junctions with cycle lanes and their proximity\n  - When it endangers oncoming cyclists\n\n• Exception: You may cross a continuous line to overtake cyclists only when:\n  - It can be done safely\n  - There is good visibility of oncoming traffic\n  - No danger to cyclists in either direction"
    },
    {
        "front": "What are the key rules for changing direction in Spain?",
        "back": "1. Observe and ensure safety\n2. Signal intention\n3. Maneuver safely\n4. Positioning:\n   • Right turn: Stick to right kerb\n   • Left turn (one-way road): Stick to left kerb\n   • Left turn (two-way road):\n     - With road markings: Follow markings\n     - Without markings: Keep to road axis without invading opposite direction\n   • Three-lane roads: Use central lane\n5. Use waiting lane if available\n6. For obstructions: Surround them on the right"
    },
    {
        "front": "How should you navigate roundabouts and exit roads in Spain?",
        "back": "Roundabouts and junctions:\n• Keep the center on your left\n• Surround the obstacle by the right\n\nExiting a road:\n1. Signal well in advance\n2. Choose lane adjacent to exit ramp\n3. Take the ramp at the beginning\n4. Slow down progressively on the ramp"
    },
    {
        "front": "What are the turning rules for cyclists on two-way interurban roads in Spain?",
        "back": "For left turns on two-way interurban roads:\n• If no special turning lane exists:\n  - Position on the right hard shoulder when possible\n  - Maneuver from there"
    },
    {
        "front": "When is changing direction prohibited in Spain?",
        "back": "Changing direction is prohibited:\n1. When turning left with poor visibility and straddling opposite direction\n2. When road markings indicate prohibition (e.g., red circle)\n3. When upright blue signs indicate mandatory direction (must follow arrows)\n\nNote: Square one-way street signs and slanted circular keep left/right signs do NOT prohibit turns. Circular 'up' sign means you MUST go forward."
    },
    {
        "front": "Can you overtake cars when there's one lane per direction of travel in Spain?",
        "back": "• Generally, overtaking is not allowed when there's only one lane per direction\n• Exceptions:\n  - You may cross a continuous line to overtake slow vehicles, cyclists, or obstacles if it's safe and visibility is good\n  - You may overtake if there's a broken line and it's safe to do so\n• Always ensure there's no oncoming traffic and good visibility before attempting to overtake"
    },
    {	
    "front": "What are the rules for making a U-turn in Spain?",
    "back": "1. Observe and ensure safety for all road users\n2. Signal intentions:\n   • Signal to slow down\n   • Signal to change lane\n3. Choose a suitable location:\n   • Minimize time blocking the road\n   • Avoid obstructing other users\n4. If hindering vehicles behind:\n   • Exit to the right if possible\n   • Wait for a safe opportunity\n5. On two-way roads with three lanes:\n   • Start the maneuver from the right lane\n6. General considerations:\n   • Perform the maneuver as quickly as safety allows\n   • Always prioritize safety over speed of maneuver"
    },
    {
        "front": "What are the rules for reversing in Spain?",
        "back": "• Generally forbidden on all roads\n• Exceptions:\n  - On closed roads where turning is impossible\n  - In these cases, can reverse as far as necessary\n  - Can even invade junctions if required\n• Forbidden on motorways and dual carriageways\n• How to reverse safely:\n  1. Observe (step out of vehicle if necessary)\n  2. Signal (use backup lights or arm signal)\n  3. Maneuver slowly and cautiously\n  4. Be prepared to stop immediately if needed"
    },
    {
        "front": "What are the rules for stationary vehicles in emergency situations in Spain?",
        "back": "• For breakdowns/accidents:\n  - Remove vehicle from road if possible\n  - Park according to regulations\n  - If safe to continue, do so immediately\n• If rescue service needed:\n  - Exit traffic lanes at first opportunity\n  - Use right shoulder if exit not possible\n  - Stop where causing least obstruction\n• Once immobilized:\n  [Information incomplete in provided notes]"
    },
    {
        "front": "What are the rules for immobilized vehicles in emergency situations in Spain?",
        "back": "• Occupants should exit:\n  - On the side away from moving traffic\n  - To a safe place off the road\n  - Don't stand on traffic lanes or shoulders\n• If unsafe to exit, remain in vehicle with seatbelts on\n• Signaling:\n  1. Turn on hazard lights\n  2. At night/poor visibility: Use sidelights (and clearance lights if needed)\n  3. Place amber luminous warning device on vehicle's highest point\n• Until Jan 1, 2026, if no luminous device:\n  - Place warning triangles 50m away, visible from 100m\n  - One-way roads (3+ lanes): 1 triangle behind\n  - Two-way roads (2-3 lanes): 1 triangle in front, 1 behind"
    },
    {
        "front": "What are the specific rules for breakdowns on motorways and dual carriageways in Spain?",
        "back": "• Request help using nearest SOS post if available\n• If no SOS service, may request assistance from other road users\n• Vehicle occupants must not walk on the road\n• Failure to place warning triangles is not punishable on these roads\n• General rules for immobilized vehicles still apply:\n  - Use hazard lights\n  - Exit vehicle safely if possible\n  - Use luminous warning device or triangles as required"
    },
    {
        "front": "What are the key safety rules when leaving your vehicle on interurban roads in Spain?",
        "back": "• Always wear a reflective waistcoat when:\n  - Leaving your vehicle\n  - Moving on the carriageway or hard shoulder\n• Any roadside assistance must be carried out by an official assistance vehicle"
    },
    {
        "front": "What are the emergency procedures for breakdowns in road tunnels or subways in Spain?",
        "back": "1. If possible, exit the tunnel\n2. If not:\n   • Drive to next emergency layby\n   • Or pull over to the right edge\n3. Switch off engine\n4. Turn on sidelights and hazard lights\n5. Fit luminous warning device\n6. Call for help using emergency telephone\n7. Prepare to follow instructions\n8. Leave vehicle and go to nearest refuge/exit\n9. Don't walk on carriageway; use traffic-free zones if available"
    },
    {
        "front": "What are the emergency procedures for fire in road tunnels or subways in Spain?",
        "back": "1. Pull vehicle to the right\n2. Allow emergency vehicles to pass\n3. Switch off engine\n4. Leave key in ignition\n5. Leave doors open\n6. All passengers must exit vehicle\n7. Head to nearest refuge/exit in opposite direction of fire\n8. Don't walk on carriageway; use traffic-free zones if available"
    },
    {
        "front": "What should you do if stationary due to traffic congestion in a road tunnel or subway in Spain?",
        "back": "1. Stop as far as possible from vehicle ahead\n2. If stationary for over 2 minutes:\n   • Switch off engine\n   • Keep sidelights on\n   • Use hazard lights briefly\n3. Don't enter tunnel/subway if traffic lights prohibit entry\n4. Follow information on electronic panels, megaphones, or other means"
    },
    {
        "front": "What should you do if your vehicle becomes stationary on a level crossing or moveable bridge in Spain?",
        "back": "1. Quickly evacuate all passengers from the vehicle\n2. Clear the crossing immediately if possible\n3. If clearing is impossible:\n   • Take all possible measures to warn approaching trains\n   • Inform train guards and drivers of the hazard as soon as possible"
    },
    {
        "front": "What are the key safety rules when leaving your vehicle on interurban roads in Spain?",
        "back": "• Always wear a reflective waistcoat when:\n  - Leaving your vehicle\n  - Moving on the carriageway or hard shoulder\n• Any roadside assistance must be carried out by an official assistance vehicle"
    },
    {
        "front": "What are the emergency procedures for breakdowns in road tunnels or subways in Spain?",
        "back": "1. If possible, exit the tunnel\n2. If not:\n   • Drive to next emergency layby\n   • Or pull over to the right edge\n3. Switch off engine\n4. Turn on sidelights and hazard lights\n5. Fit luminous warning device\n6. Call for help using emergency telephone\n7. Prepare to follow instructions\n8. Leave vehicle and go to nearest refuge/exit\n9. Don't walk on carriageway; use traffic-free zones if available"
    },
    {
        "front": "What are the emergency procedures for fire in road tunnels or subways in Spain?",
        "back": "1. Pull vehicle to the right\n2. Allow emergency vehicles to pass\n3. Switch off engine\n4. Leave key in ignition\n5. Leave doors open\n6. All passengers must exit vehicle\n7. Head to nearest refuge/exit in opposite direction of fire\n8. Don't walk on carriageway; use traffic-free zones if available"
    },
    {
        "front": "What should you do if stationary due to traffic congestion in a road tunnel or subway in Spain?",
        "back": "1. Stop as far as possible from vehicle ahead\n2. If stationary for over 2 minutes:\n   • Switch off engine\n   • Keep sidelights on\n   • Use hazard lights briefly\n3. Don't enter tunnel/subway if traffic lights prohibit entry\n4. Follow information on electronic panels, megaphones, or other means"
    },
    {
        "front": "What should you do if your vehicle becomes stationary on a level crossing or moveable bridge in Spain?",
        "back": "1. Quickly evacuate all passengers from the vehicle\n2. Clear the crossing immediately if possible\n3. If clearing is impossible:\n   • Take all possible measures to warn approaching trains\n   • Inform train guards and drivers of the hazard as soon as possible"
    },
    {
        "front": "Where are both stopping and parking forbidden in Spain?",
        "back": "Both stopping and parking are forbidden:\n1. Where marked by a SOLID yellow line\n2. On bends and road humps with poor visibility and nearby\n3. In tunnels, underpasses, and sections with 'road tunnel' signs\n4. At junctions and proximities impairing turns\n5. In interurban areas causing hazard due to lack of visibility\n6. Where road signs are not visible to users\n7. On motorways and dual carriageways (except designated areas)\n8. In lanes for specific users (bus lanes, taxi ranks, cycle lanes, tramway rails)\n9. Where distance to opposite kerb is less than 3m and passing is not permitted\n10. On medians, separators, islands, or traffic flow directors\n11. Obstructing access to lowered kerbs for impaired people\n12. Where parked vehicle can't join traffic\n13. Obstructing turns indicated by road signs\n14. Obstructing exit/entrance to property"
    },
    {
        "front": "Where is parking forbidden in Spain?",
        "back": "Parking is forbidden:\n1. Where 'No Parking' signs are present (5 types: all times, odd days, even days, 1st fortnight, 2nd fortnight)\n2. In residential streets (except when signs/markings allow)\n3. Where broken yellow lines are present\n4. Where zigzag lines are present (any color)\n5. In time-limited zones without valid ticket or exceeding time limit\n6. Double parking (with no driver)\n7. Loading/unloading zones during operation hours\n8. On dropped kerbs (lowered curbs for vehicle/wheelchair access)\n9. In the centre of a carriageway\n10. Areas reserved for emergency services\n11. At marked public transport stops\n12. Forbidden areas on high-traffic public roads\n\nNote: Law enforcement agents can remove and apprehend vehicles violating these rules"
    },
    {
        "front": "What are the general rules for obeying road signs and traffic lights in Spain?",
        "back": "1. Primary rule: Obey traffic lights and signs on the right side of your lane/carriageway\n\n2. If right-side signs/lights are absent:\n   • To go straight or turn left: Follow left-side signs/lights\n   • To turn right: Follow right-side signs if present, otherwise proceed with caution\n\n3. When signs/lights on both sides convey different information:\n   • To go straight or turn left: Follow left-side signs/lights\n   • To turn right: Follow right-side signs/lights\n\n4. General principle: When in doubt or if signs are unclear, proceed with caution and follow the most restrictive instruction\n\n5. Remember: These rules apply to your specific lane or part of the carriageway, not necessarily the entire road"
    },
    {
        "front": "What is the priority order of conflicting traffic signs in Spain?",
        "back": "From highest to lowest priority:\n1. Traffic agents\n2. Temporary signs\n3. Traffic lights\n4. Upright signs\n5. Road marks"
    },
    {
        "front": "How is the color yellow used in road markings and signs in Spain?",
        "back": "Yellow is used for:\n• Road surface markings indicating road works\n• Background of some warning signs\n• Background of some regulatory signs"
    },
    {
        "front": "What are the arm signals used by traffic agents in Spain and their meanings?",
        "back": "1. Arm raised vertically: All users must stop (except those unable to stop safely)\n2. Arms out horizontally: Oncoming users from directions cutting the indicated direction must stop\n3. Arm waved up and down: Approaching drivers must slow down\n4. Red or yellow baton pointed: Drivers must stop\n5. Several short whistles: Driver must stop\n6. Long whistle: Vehicles may proceed\n\nNote: Signals remain valid until the agent changes the signal"
    },
    {
        "front": "What are the signals used by traffic officers from vehicles in Spain?",
        "back": "1. Straight arm, palm down: Vehicles must stop on the right side\n2. Red/yellow light bar/beacon: Vehicle in front must stop on right side and occupants remain inside\n3. Red flag: Road closure\n4. Yellow flag: Hazard ahead\n5. Green flag: Road open, but overtaking the officer is forbidden\n\nNote: Officers typically use these signals from motorcycles"
    },
    {
    "front": "What are the basic lighting requirements for vehicles in Spain?",
    "back": "Mandatory use:\n• Between sunset and sunrise\n• Poor visibility conditions\n• Tunnels and underpasses (all times)\n\nMinimum required:\n• Built-up areas: Sidelights + Dipped beam\n• Interurban roads: Sidelights + Dipped beam\n• Poorly lit roads >40km/h: High beam allowed\n\nNote: Motorcycles must use dipped beam at all times"
},
{
    "front": "What are the rules for different types of lights in Spain?",
    "back": "Sidelights (white front, red rear):\n• Activate with all other lights\n• Must be on whenever vehicle is lit\n\nDipped beam (white):\n• Main light for normal driving\n• Required in urban areas\n• Used when high beam inappropriate\n\nHigh beam (white):\n• For poorly lit roads >40km/h\n• Prohibited:\n  - Urban areas\n  - When stationary/parked\n  - When may dazzle others"
},
{
    "front": "What are the lighting rules for parked and stationary vehicles in Spain?",
    "back": "Must use lights when parked:\n• On interurban hard shoulders\n• At poorly lit crossings\n• When visibility is limited\n\nParking lights (specific):\n• Two white front + two red rear\n• Used in built-up areas only\n• Replaces sidelights when parked\n• Must align with sidelights\n\nNote: In line parking, road-side lights sufficient"
},
{
    "front": "What are the rules for using fog lights in Spain?",
    "back": "In adverse weather:\n\nDaytime:\n• Sidelights mandatory\n• Plus either:\n  - Fog lights, or\n  - Dipped beam, or\n  - High beam\n\nNighttime:\n• Sidelights mandatory\n• Dipped beam mandatory\n• Fog lights optional\n\nNote: Only use fog lights in conditions of significantly reduced visibility"
},
{
    "front": "What are the requirements for additional vehicle lighting and markers in Spain?",
    "back": "End outline marker lamps:\n• Mandatory >2.1m wide:\n  - Two white front\n  - Two red rear\n• Optional 1.8-2.1m wide\n\nRetro-reflective markers:\n• Required on all vehicles\n• Must be triangular on trailers\n• Color requirements:\n  - Front: White\n  - Side: Amber\n  - Rear: Red\n\nNote: All markers must be visible in dark conditions"
},
{
    "front": "What are the child safety requirements in Spanish vehicles?",
    "back": "General rule (children under 135cm):\n• Must use authorized child restraint systems\n• Must match size and weight\n• Must use rear seats\n\nFront seat allowed only if:\n1. No rear seats available\n2. Rear seats occupied by other children <135cm\n3. Cannot install restraints in rear\n\nCritical safety note:\n• Front airbag must be deactivated for rear-facing restraints\n• Proper installation is mandatory\n• Size and weight matching is essential"
},
{
    "front": "What are the motorcycle and bicycle passenger rules in Spain?",
    "back": "Motorcycles/Mopeds:\n• Maximum one passenger (plus sidecar if available)\n• Requirements:\n  - License must permit passengers\n  - Passenger 12+ years old\n  - Must sit astride behind driver\n  - Must use foot pegs\n  - Exception: Children 7+ with parent/guardian\n\nBicycles:\n• Cyclist must be 18+\n• One child up to age 7\n• Must use approved child seat"
},
{
    "front": "Who is exempt from wearing seatbelts in Spain?",
    "back": "Always exempt:\n• Drivers reversing/parking\n• Medical certificate holders\n\nExempt in urban areas only:\n• Delivery workers during loading/unloading\n• Emergency responders\n• On-duty taxi drivers\n• Driving instructors during lessons\n\nImportant: No exemptions on:\n• Motorways\n• Dual carriageways\n• Highways through communities"
},
{
    "front": "What are the helmet requirements for different vehicles in Spain?",
    "back": "Helmet mandatory for:\n• Motorcycles (with/without sidecar)\n• Mopeds\n• Three/four-wheeled light vehicles\n• Quad bikes\n• Bicycles on interurban roads\n\nExceptions:\n• Vehicles with self-protective devices AND seatbelts:\n  - Must use seatbelt instead of helmet\n• Bicycles when conditions don't recommend helmet use\n\nNote: Helmets must be correctly fastened"
},
{
    "front": "What are the general rules for loading/unloading operations in Spain?",
    "back": "Primary rule:\n• Operations should be off-road when possible\n\nWhen on-road:\n• Use side nearest to kerb\n• Follow parking/stopping rules\n• Comply with local authority times/places\n• Vehicle must be properly immobilized\n\nStrictly forbidden:\n• Depositing goods on:\n  - Road\n  - Hard shoulder\n  - Pedestrian areas\n\nOperational requirements:\n• Complete as quickly as possible\n• Avoid unnecessary hazards\n• Minimize noise"
},
{
    "front": "What are the safety requirements for transporting loads in Spain?",
    "back": "Load positioning must not:\n• Compromise vehicle stability\n• Obscure:\n  - Vehicle lights\n  - Other devices\n  - Plates\n  - Signals\n• Risk falling or dragging\n• Create dust or noise\n\nSpecial considerations:\n• Passenger compartment: Only small, light objects\n• Roof rack:\n  - Heavy/large items affect stability\n  - May increase rollover risk\n  - Increases fuel consumption\n\nWarning: Unsecured items can become dangerous projectiles"
},
{
    "front": "What are the maximum vehicle length limits in Spain?",
    "back": "Standard vehicles:\n• Motor vehicles, cars, vans, lorries: 12m\n\nSpecial vehicles:\n• Buses:\n  - 2 axles: 13.5m\n  - 3+ axles: 15m\n• Semi-trailers: 14.04m\n• Articulated vehicles: 16.5m\n• Road trains: 18.75m\n\nNote: Vehicles >12m must display V-6 'long vehicle' marking at rear"
},
{
    "front": "What are the maximum width and height limits for vehicles in Spain?",
    "back": "Width limit:\n• General: 2.55m\n• Special exceptions:\n  - Refrigerated transport\n  - Prisoner transport\n\nHeight limit:\n• General: 4m\n• Urban buses: 4.2m\n• Special vehicles: 4.5m\n  - Vehicle transporters\n  - Crane trucks\n  - Container frame trucks"
},
{
    "front": "What are the load overhang rules for general vehicles in Spain?",
    "back": "Non-transport specific vehicles:\n• Divisible loads: Up to 10% of vehicle length\n• Indivisible loads: Up to 15% of vehicle length\n\nRestrictions:\n• Rear overhang only\n• Front/side overhang prohibited\n• Must not exceed maximum width/height limits\n\nNote: All overhanging loads must be properly marked"
},
{
    "front": "What are the load overhang limits for transport vehicles in Spain?",
    "back": "Vehicles under 5m length:\n• Front: Up to 1/3 of vehicle length\n• Rear: Up to 1/3 of vehicle length\n• Sides: Up to 0.4m each side\n\nVehicles over 5m length:\n• Front: Up to 2m\n• Rear: Up to 3m\n• Sides: Up to 0.4m each side\n\nMotorcycles/Mopeds (<1m wide):\n• Rear: Up to 0.25m\n• Sides: Up to 0.5m each side"
},
{
    "front": "How must overhanging loads be marked in Spain?",
    "back": "Daytime/Clear weather:\n• Red and white diagonal striped square at rear\n\nNight/Poor visibility:\n• Front: White light\n• Rear: Red light\n\nWhen width exceeds 0.4m:\n• Front: White reflective device\n• Rear: Red reflective device\n\nNote: All markings must be clearly visible to other road users"
},
{
    "front": "What are the acceptable ways to prove you have a driving license in Spain?",
    "back": "You must be able to prove license possession through either:\n\n• Physical driving license document\n\nOR\n\n• miDGT mobile application\n\nNote: This applies to:\n• All motor vehicles\n• Mopeds"
},
{
    "front": "What are the motorcycle license categories and requirements in Spain?",
    "back": "A1 License:\n• Age: 16+\n• Power: Up to 15kW\n\nA2 License:\n• Age: 18+\n• Power: Up to 35kW\n\nA License:\n• Age: 20+\n• Power: Unlimited\n\nNote: B License does NOT permit motorcycle use"
},
{
    "front": "What vehicles can you drive with a B License in Spain?",
    "back": "Basic permissions:\n• Motor vehicles ≤3,500kg\n• Age requirement: 18+\n\nTrailer options:\n• Trailers ≤750kg\n• Trailers >750kg if combined weight ≤3,500kg\n\nAfter 2 years:\n• Alternative fuel vehicles up to 4,250kg (national only)\n\nAlso permits:\n• Tricycles and quad bikes\n• Mopeds\n• Mobility vehicles\n• Special agricultural vehicles"
},
{
    "front": "What are the key documentation requirements for driving in Spain?",
    "back": "Must carry (original or certified copy):\n• Driving license (physical or miDGT app)\n• Vehicle registration certificate\n• Current ITV certificate\n• Latest roadworthiness report\n\nLicense validity:\n• Under 65: 10 years\n• Over 65: 5 years\n\nNew drivers:\n• Must display L sign for first year\n\nDocument changes:\n• Report within 15 days to Traffic HQ\n• Vehicle sale: Seller 10 days, Buyer 30 days"
},
{
    "front": "What are the ITV (technical inspection) requirements in Spain?",
    "back": "Cars:\n• 0-4 years: Exempt\n• 4-10 years: Every 2 years\n• 10+ years: Yearly\n\nMotorcycles:\n• 0-4 years: Exempt\n• 4+ years: Every 2 years\n\nNote: Vehicle owner responsible for compliance"
},
{
    "front": "What are the insurance requirements in Spain?",
    "back": "Mandatory coverage:\n• All motor vehicles and mopeds\n• Third-party liability\n\nCovers:\n• Injuries to others\n• Third-party property damage\n\nNot covered:\n• Driver's injuries\n• Own vehicle damage\n• Stolen vehicles\n• Family member property\n• Load damage\n\nNote:\n• Police may verify coverage\n• Cannot drive without insurance\n• DUI may void coverage"
},
{
    "front": "How does the points system work in Spain?",
    "back": "Starting points:\n• Standard: 12 points\n• New drivers (first 2 years): 8 points\n• After total point loss: 8 points\n\nBonus points:\n• Up to 15 maximum\n• +2 points/year (first 3 years)\n• +1 point/year (next 3 years)\n• +2 points for safety courses\n\nPoint recovery:\n• Automatic after 2 years without infractions"
},
{
    "front": "What are common point-losing infractions in Spain?",
    "back": "3 points:\n• Direction changes against laws\n• Using headphones/mobile\n• Radar detector possession\n\n4 points:\n• Driving without proper permit\n• Breaking overtaking rules\n• Motorway reversing\n• Unsafe distance\n\n6 points:\n• Double limit alcohol\n• Drug driving\n• Reckless driving\n• Contraflow\n• Throwing objects on road\n\nNote: Maximum 8 points lost per day (except speed violations)"
},
    
];

function adjustFontSize(element, maxLines = 8, minFontSize = 12) {
    const maxHeight = parseFloat(getComputedStyle(element).lineHeight) * maxLines;
    let fontSize = parseFloat(getComputedStyle(element).fontSize);
    
    while (element.scrollHeight > maxHeight && fontSize > minFontSize) {
        fontSize--;
        element.style.fontSize = `${fontSize}px`;
    }
}

function loadFlashcards() {
    if (Array.isArray(flashcardsData) && flashcardsData.length > 0) {
        flashcards = flashcardsData;
        displayCard();
    } else {
        showErrorMessage('Flashcards data is empty or not an array');
    }
}

function showErrorMessage(message) {
    const errorMessage = document.createElement('div');
    errorMessage.textContent = `Error: ${message}. Please check the console for more details.`;
    errorMessage.style.color = 'red';
    errorMessage.style.marginTop = '20px';
    document.querySelector('.app-container').appendChild(errorMessage);
}

function displayCard() {
    if (memorizedCards.size === flashcards.length) {
        showNoCardsMessage();
        return;
    }

    while (memorizedCards.has(currentCardIndex)) {
        currentCardIndex = (currentCardIndex + 1) % flashcards.length;
    }

    const card = flashcards[currentCardIndex];
    frontContentEl.textContent = card.front;
    backContentEl.textContent = card.back;
    cardNumberEl.textContent = `Card ${currentCardIndex + 1} of ${flashcards.length}`;
    flashcardEl.classList.remove('flipped');
    updateMemorizedCheckbox();

    // Apply dynamic font sizing
    adjustFontSize(frontContentEl);
    adjustFontSize(backContentEl);
}

function showNoCardsMessage() {
    flashcardEl.style.display = 'none';
    noCardsMessage.classList.remove('hidden');
}

function updateMemorizedCheckbox() {
    memorizedCheckbox.checked = memorizedCards.has(currentCardIndex);
}

function toggleTestMode() {
    testMode = !testMode;
    testModeButton.textContent = testMode ? 'Study Mode' : 'Test Mode';
    memorizedContainer.classList.toggle('hidden', !testMode);
}

function resetCards() {
    memorizedCards.clear();
    currentCardIndex = 0;
    displayCard();
    flashcardEl.style.display = 'block';
    noCardsMessage.classList.add('hidden');
}

flashcardEl.addEventListener('click', () => {
    flashcardEl.classList.toggle('flipped');
});

prevButton.addEventListener('click', () => {
    currentCardIndex = (currentCardIndex - 1 + flashcards.length) % flashcards.length;
    displayCard();
});

nextButton.addEventListener('click', () => {
    currentCardIndex = (currentCardIndex + 1) % flashcards.length;
    displayCard();
});

testModeButton.addEventListener('click', toggleTestMode);
resetButton.addEventListener('click', resetCards);

memorizedCheckbox.addEventListener('change', () => {
    if (memorizedCheckbox.checked) {
        memorizedCards.add(currentCardIndex);
    } else {
        memorizedCards.delete(currentCardIndex);
    }
    displayCard();
});

loadFlashcards();
