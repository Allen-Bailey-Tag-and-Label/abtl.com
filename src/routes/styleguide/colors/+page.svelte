<script>
	import { Card } from '$components';

	// props (internal)
	const colors = [
		{
			title: 'Primary',
			shades: [
				{ classes: { bg: 'dark:bg-primary-50 bg-primary-50', text: 'text-gray-800' }, shade: '50' },
				{
					classes: { bg: 'dark:bg-primary-100 bg-primary-100', text: 'text-gray-800' },
					shade: '100'
				},
				{
					classes: { bg: 'dark:bg-primary-200 bg-primary-200', text: 'text-gray-800' },
					shade: '200'
				},
				{
					classes: { bg: 'dark:bg-primary-300 bg-primary-300', text: 'text-gray-800' },
					shade: '300'
				},
				{
					classes: { bg: 'dark:bg-primary-400 bg-primary-400', text: 'text-gray-800' },
					shade: '400'
				},
				{
					classes: { bg: 'dark:bg-primary-500 bg-primary-500', text: 'text-white' },
					shade: '500'
				},
				{
					classes: { bg: 'dark:bg-primary-600 bg-primary-600', text: 'text-white' },
					shade: '600'
				},
				{
					classes: { bg: 'dark:bg-primary-700 bg-primary-700', text: 'text-white' },
					shade: '700'
				},
				{
					classes: { bg: 'dark:bg-primary-800 bg-primary-800', text: 'text-white' },
					shade: '800'
				},
				{
					classes: { bg: 'dark:bg-primary-900 bg-primary-900', text: 'text-white' },
					shade: '900'
				},
				{
					classes: { bg: 'dark:bg-primary-950 bg-primary-950', text: 'text-white' },
					shade: '950'
				}
			]
		},
		{
			title: 'Secondary',
			shades: [
				{
					classes: { bg: 'dark:bg-secondary-50 bg-secondary-50', text: 'text-gray-800' },
					shade: '50'
				},
				{
					classes: { bg: 'dark:bg-secondary-100 bg-secondary-100', text: 'text-gray-800' },
					shade: '100'
				},
				{
					classes: { bg: 'dark:bg-secondary-200 bg-secondary-200', text: 'text-gray-800' },
					shade: '200'
				},
				{
					classes: { bg: 'dark:bg-secondary-300 bg-secondary-300', text: 'text-gray-800' },
					shade: '300'
				},
				{
					classes: { bg: 'dark:bg-secondary-400 bg-secondary-400', text: 'text-gray-800' },
					shade: '400'
				},
				{
					classes: { bg: 'dark:bg-secondary-500 bg-secondary-500', text: 'text-white' },
					shade: '500'
				},
				{
					classes: { bg: 'dark:bg-secondary-600 bg-secondary-600', text: 'text-white' },
					shade: '600'
				},
				{
					classes: { bg: 'dark:bg-secondary-700 bg-secondary-700', text: 'text-white' },
					shade: '700'
				},
				{
					classes: { bg: 'dark:bg-secondary-800 bg-secondary-800', text: 'text-white' },
					shade: '800'
				},
				{
					classes: { bg: 'dark:bg-secondary-900 bg-secondary-900', text: 'text-white' },
					shade: '900'
				},
				{
					classes: { bg: 'dark:bg-secondary-950 bg-secondary-950', text: 'text-white' },
					shade: '950'
				}
			]
		},
		{
			title: 'Tertiary',
			shades: [
				{
					classes: { bg: 'dark:bg-tertiary-50 bg-tertiary-50', text: 'text-gray-800' },
					shade: '50'
				},
				{
					classes: { bg: 'dark:bg-tertiary-100 bg-tertiary-100', text: 'text-gray-800' },
					shade: '100'
				},
				{
					classes: { bg: 'dark:bg-tertiary-200 bg-tertiary-200', text: 'text-gray-800' },
					shade: '200'
				},
				{
					classes: { bg: 'dark:bg-tertiary-300 bg-tertiary-300', text: 'text-gray-800' },
					shade: '300'
				},
				{
					classes: { bg: 'dark:bg-tertiary-400 bg-tertiary-400', text: 'text-gray-800' },
					shade: '400'
				},
				{
					classes: { bg: 'dark:bg-tertiary-500 bg-tertiary-500', text: 'text-white' },
					shade: '500'
				},
				{
					classes: { bg: 'dark:bg-tertiary-600 bg-tertiary-600', text: 'text-white' },
					shade: '600'
				},
				{
					classes: { bg: 'dark:bg-tertiary-700 bg-tertiary-700', text: 'text-white' },
					shade: '700'
				},
				{
					classes: { bg: 'dark:bg-tertiary-800 bg-tertiary-800', text: 'text-white' },
					shade: '800'
				},
				{
					classes: { bg: 'dark:bg-tertiary-900 bg-tertiary-900', text: 'text-white' },
					shade: '900'
				},
				{
					classes: { bg: 'dark:bg-tertiary-950 bg-tertiary-950', text: 'text-white' },
					shade: '950'
				}
			]
		},
		{
			title: 'Gray',
			shades: [
				{
					classes: { bg: 'dark:bg-gray-50 bg-gray-50', text: 'text-gray-800' },
					shade: '50'
				},
				{
					classes: { bg: 'dark:bg-gray-100 bg-gray-100', text: 'text-gray-800' },
					shade: '100'
				},
				{
					classes: { bg: 'dark:bg-gray-200 bg-gray-200', text: 'text-gray-800' },
					shade: '200'
				},
				{
					classes: { bg: 'dark:bg-gray-300 bg-gray-300', text: 'text-gray-800' },
					shade: '300'
				},
				{
					classes: { bg: 'dark:bg-gray-400 bg-gray-400', text: 'text-gray-800' },
					shade: '400'
				},
				{
					classes: { bg: 'dark:bg-gray-500 bg-gray-500', text: 'text-gray-800' },
					shade: '500'
				},
				{
					classes: { bg: 'dark:bg-gray-600 bg-gray-600', text: 'text-white' },
					shade: '600'
				},
				{
					classes: {
						bg: 'dark:bg-gray-700 bg-gray-700 dark:ring-1 dark:ring-inset',
						text: 'text-white'
					},
					shade: '700'
				},
				{
					classes: { bg: 'dark:bg-gray-800 bg-gray-800', text: 'text-white' },
					shade: '800'
				},
				{
					classes: { bg: 'dark:bg-gray-900 bg-gray-900', text: 'text-white' },
					shade: '900'
				},
				{
					classes: { bg: 'dark:bg-gray-950 bg-gray-950', text: 'text-white' },
					shade: '950'
				}
			]
		}
	];
</script>

<div class="flex flex-col space-y-[1rem]">
	<div class="uppercase font-semibold">Colors</div>
	{#each colors as { title, shades }}
		<Card class="grid lg:grid-cols-12 items-center">
			<div>{title}</div>
			{#each shades as { classes, shade }}
				<Card class="ring-0 dark:ring-0 justify-center items-center {classes.bg} {classes.text}">
					{shade}
				</Card>
			{/each}
		</Card>
	{/each}
</div>
