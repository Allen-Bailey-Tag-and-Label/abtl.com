import BeverageLabel from './BeverageLabel.svelte';
import HydroLabel from './HydroLabel.svelte';
import KeyTags from './KeyTags.svelte';
import LuggageTag from './LuggageTag.svelte';
import ParkingTicket from './ParkingTicket.svelte';
import RebarTag from './RebarTag.svelte';
import ServiceTag from './ServiceTag.svelte';
import TreeTag from './TreeTag.svelte';

export const products = [
	{ component: BeverageLabel, description: 'Beverage Labels' },
	{ component: HydroLabel, description: 'Hydro Labels' },
	{ component: KeyTags, description: 'Key Tags' },
	{ component: LuggageTag, description: 'Luggage Tags' },
	// { component: ParkingTicket, description: 'Parking Tickets' },
	{ component: RebarTag, description: 'Rebar Tags' },
	{ component: ServiceTag, description: 'Service Tags' },
	{ component: TreeTag, description: 'Tree Tags' }
];
