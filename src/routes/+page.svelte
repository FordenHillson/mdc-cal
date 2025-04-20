<script>
	import { onMount } from 'svelte';
	import EquipCard from '$lib/equipCard.svelte';
	import data from '../mdcData.json';

	let baseMDC = 17999999;

	// Array to manage multiple cards
	let equCards = [
		{ itemType: 'Hat', rarity: '', level: 0, mdcValue: 0 },
		{ itemType: 'Glove', rarity: '', level: 0, mdcValue: 0 },
		{ itemType: 'Top', rarity: '', level: 0, mdcValue: 0 },
		{ itemType: 'Bottom', rarity: '', level: 0, mdcValue: 0 },
		{ itemType: 'Outfit', rarity: '', level: 0, mdcValue: 0 },
		{ itemType: 'Shoulder', rarity: '', level: 0, mdcValue: 0 },
		{ itemType: 'Shoes', rarity: '', level: 0, mdcValue: 0 },
		{ itemType: 'Belt', rarity: '', level: 0, mdcValue: 0 },
		{ itemType: 'Cape', rarity: '', level: 0, mdcValue: 0 }
	];

	// Function to handle the save event from a specific Card
	function handleSave(event, index) {
		const { itemType, rarity, level } = event.detail;

		// Find the matching mdcValue from mdcData.json
		const equipmentData = data.equipment.find((e) => e.itemType === itemType);
		if (equipmentData) {
			const match = equipmentData.data.find(
				(item) => item.rarity === rarity && item.level === level
			);
			equCards[index].mdcValue = match ? match.value : 0;
		} else {
			equCards[index].mdcValue = 0; // Default if no match
		}

		// Update the card data
		equCards[index] = { ...equCards[index], itemType, rarity, level };
	}

	// Function to format numbers with commas
	function formatNumber(num) {
		return new Intl.NumberFormat().format(num);
	}

	// Calculate total MDC
	$: totalMDC = baseMDC + equCards.reduce((sum, card) => sum + card.mdcValue, 0);

	
</script>

<nav>
	<h1 class="font-extrabold text-white">MDC Calculator</h1>
	<ul style="margin-left: auto; display: flex; gap: 1rem; align-items: center;">
		<li><a href="/">Home</a></li>
		<li><a href="/about">About</a></li>
		<li></li>
	</ul>
</nav>

<main class="dark">
	<div class="container">
		<div
			class="flex w-[300px] flex-col gap-3 rounded-md bg-white px-4 py-5 text-center font-bold shadow-[0px_0px_15px_rgba(0,0,0,0.09)] dark:bg-gray-800 dark:text-white"
		>
			Total MDC
			<div
				class="flex w-[200px] flex-col gap-3 self-center rounded-md bg-white px-4 py-5 text-center font-bold shadow-[0px_0px_15px_rgba(0,0,0,0.09)] dark:bg-blue-800 dark:text-white"
			>
				{formatNumber(totalMDC)}
			</div>
		</div>
		<p class="mt-4">equipment</p>
		<div class="mt-5 flex grid grid-cols-2 flex-col gap-1.5 gap-3 px-2 py-4 xl:grid-cols-5 border-y-1 border-slate-500">
			{#each equCards as card, index}
				<EquipCard
					itemType={card.itemType}
					rarity={card.rarity}
					level={card.level}
					mdcValue={formatNumber(card.mdcValue)}
					on:save={(event) => handleSave(event, index)}
				/>
			{/each}
		</div>
	</div>
</main>

<footer>
	<p></p>
</footer>

<style>
	@import '../app.css';
</style>
