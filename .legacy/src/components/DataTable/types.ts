import type { SvelteComponent } from 'svelte';

export type Column =
	| string
	| {
			component: SvelteComponent;
			editable: boolean;
			field: string;
			props: { [key: string]: any };
			search: string | boolean;
			searchable: boolean;
			sortable: boolean;
			title: string;
	  };
export type Columns = Column[];
export type Filter = { column: string; logic: string; value: string };
export type Filters = Filter[] | undefined;

export type Row = { [key: string]: string };
export type Rows = Row[];
