import { theme } from 'sveltewind/stores';

export const setTheme = () => {
	theme.set({
		a: 'shadow-none hover:shadow-none relative text-current transition duration-200 hover:text-white focus:text-white before:absolute before:content-[""] before:absolute before:bottom-0 before:left-0 before:w-full before:h-[1px] before:transition-all before:duration-200 before:bg-primary-500 hover:before:h-full focus:before:h-full',
		button:
			'rounded-full ring-0 relative bg-transparent hover:bg-transparent before:ring before:ring-transparent focus:before:ring-primary-500/[.3] focus:bg-transparent before:content-[""] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-primary-500 before:rounded-full before:scale-100 before:transition before:duration-200 hover:before:scale-[1.1] focus:before:scale-[1.1] uppercase text-[.875rem] leading-[1.5em] font-semibold py-[.75rem] px-[2.5rem]',
		card: 'shadow-none dark:bg-gray-700 dark:shadow-none ring-1 ring-gray-200',
		checkbox:
			'text-white group-hover:cursor-pointer group-hover:ring-primary-500/[.3] group-focus:ring-primary-500/[.3] group-hover:ring-offset-primary-500 group-focus:ring-offset-primary-500 peer-hover:ring-primary-500/[.3] peer-focus:ring-primary-500/[.3] peer-hover:ring-offset-primary-500 peer-focus:ring-offset-primary-500',
		checkboxChecked: 'bg-primary-500 dark:bg-primary-500'
	});
	if (window) {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
			return true;
		} else {
			document.documentElement.classList.remove('dark');
			return false;
		}
	}
};
