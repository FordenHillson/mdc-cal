<script lang="ts">
	import { createThemeSwitcher, Theme, ThemeToggle, ThemeSelect } from 'svelte-theme-select'
	import '../app.css';

	createThemeSwitcher()

	let { children } = $props();
</script>

{@render children()}
