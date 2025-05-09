<script>
	import { onMount } from 'svelte';
	import EquipCard from '$lib/equipCard.svelte';
	import SoulCard from '$lib/soulCard.svelte';
	import CommanderCard from '$lib/commanderCard.svelte';
	import LegionCard from '$lib/legionCard.svelte';
	import data from '../mdcData.json';

	let baseMDC = 17999999;

	// Array to manage multiple cards
	let equCards = [
		{ itemType: 'Hat', rarity: '', level: 0, mdcValue: 0, img: 'https://i.imgur.com/f9ImEaq.png' },
		{
			itemType: 'Glove',
			rarity: '',
			level: 0,
			mdcValue: 0,
			img: 'https://i.imgur.com/BHuJ00d.png'
		},
		{ itemType: 'Top', rarity: '', level: 0, mdcValue: 0, img: 'https://i.imgur.com/Qeoh6vW.png' },
		{
			itemType: 'Bottom',
			rarity: '',
			level: 0,
			mdcValue: 0,
			img: 'https://i.imgur.com/UqjJKWi.png'
		},
		{
			itemType: 'Outfit',
			rarity: '',
			level: 0,
			mdcValue: 0,
			img: 'https://i.imgur.com/8R6GzvI.png'
		},
		{
			itemType: 'Shoulder',
			rarity: '',
			level: 0,
			mdcValue: 0,
			img: 'https://i.imgur.com/GCHid7v.png'
		},
		{
			itemType: 'Shoes',
			rarity: '',
			level: 0,
			mdcValue: 0,
			img: 'https://i.imgur.com/PWXFktG.png'
		},
		{ itemType: 'Belt', rarity: '', level: 0, mdcValue: 0, img: 'https://imgur.com/XKZwo5q.png' },
		{ itemType: 'Cape', rarity: '', level: 0, mdcValue: 0, img: 'https://imgur.com/L0BCvKk.png' }
	];

	let soulCards = [
		{
			soulTitle: 'Soul Weapon',
			soulType: 'Boss',
			mdcValue: 0,
			img: 'https://i.imgur.com/pcDNKj8.png',
			defaultImg: 'https://i.imgur.com/D5sC82J.png'
		},
		{
			soulTitle: 'Soul secondary Weapon',
			soulType: 'Boss',
			mdcValue: 0,
			img: 'https://i.imgur.com/pcDNKj8.png',
			defaultImg: 'https://i.imgur.com/8pYk4rN.png'
		},
		{
			soulTitle: 'Soul SD',
			soulType: 'Boss',
			mdcValue: 0,
			img: 'https://i.imgur.com/pcDNKj8.png',
			defaultImg: 'https://i.imgur.com/GCHid7v.png'
		},
		{
			soulTitle: 'Soul B',
			soulType: 'Boss',
			mdcValue: 0,
			img: 'https://i.imgur.com/pcDNKj8.png',
			defaultImg: 'https://i.imgur.com/XKZwo5q.png'
		},
		{
			soulTitle: 'Soul C',
			soulType: 'Boss',
			mdcValue: 0,
			img: 'https://i.imgur.com/pcDNKj8.png',
			defaultImg: 'https://i.imgur.com/L0BCvKk.png'
		},
		{
			soulTitle: 'Soul S',
			soulType: 'Boss',
			mdcValue: 0,
			img: 'https://i.imgur.com/pcDNKj8.png',
			defaultImg: 'https://i.imgur.com/JXnK8RC.png'
		}
	];

	let commanderCards = [
		{
			comTitle: 'Commander Set',
			comType: 'None',
			mdcValue: 0,
			img: 'https://www.grandislibrary.com/images/equipment/ifias-necklace.png'
		}
	];

	let legionCards = [
		{
			legionTitle: 'Legion',
			legionType: 'None',
			mdcValue: 0,
			img: 'https://static.wikia.nocookie.net/maplestory/images/a/a7/Nameless_Legion_Rank_1.png'
		}
	];

	// Function to handle the save event from a specific Card
	function handleEquSave(event, index) {
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

	// Function to handle the save event from a specific Soul Card
	function handleSoulSave(event, index) {
		const { soulType } = event.detail;

		// Find the matching mdcValue from mdcData.json
		const soulData = data.Soul.find((s) => s.type === soulType);
		if (soulData) {
			soulCards[index].mdcValue = soulData.value;
		} else {
			soulCards[index].mdcValue = 0; // Default if no match
		}

		// Update the card data
		soulCards[index] = { ...soulCards[index], soulType };
	}

	function handleSoulESave(event, index) {
		const { soulType } = event.detail;

		// Find the matching mdcValue from mdcData.json
		const soulEData = data.SoulE.find((se) => se.type === soulType);
		if (soulEData) {
			soulCards[index].mdcValue = soulEData.value;
		} else {
			soulCards[index].mdcValue = 0; // Default if no match
		}

		// Update the card data
		soulCards[index] = { ...soulCards[index], soulType };
	}

	function handleCommanESave(event, index) {
		const { comType } = event.detail;

		// Find the matching mdcValue from mdcData.json
		const comData = data.CommanderSet.find((c) => c.type === comType);
		if (comData) {
			commanderCards[index].mdcValue = comData.value;
		} else {
			commanderCards[index].mdcValue = 0; // Default if no match
		}

		// Update the card data
		commanderCards[index] = { ...commanderCards[index], comType };
	}

	function handleLegionSave(event, index) {
		const { legionType } = event.detail;

		// Find the matching mdcValue from mdcData.json
		const legionData = data.Legion.find((l) => l.type === legionType);
		if (legionData) {
			legionCards[index].mdcValue = legionData.value;
		} else {
			legionCards[index].mdcValue = 0; // Default if no match
		}

		// Update the card data
		legionCards[index] = { ...legionCards[index], legionType };
	}

	// Function to format numbers with commas
	function formatNumber(num) {
		return new Intl.NumberFormat().format(num);
	}

	// Calculate total MDC
	$: totalMDC =
		baseMDC +
		equCards.reduce((sum, card) => sum + card.mdcValue, 0) +
		soulCards.reduce((sum, card) => sum + card.mdcValue, 0) +
		commanderCards.reduce((sum, card) => sum + card.mdcValue, 0) +
		legionCards.reduce((sum, card) => sum + card.mdcValue, 0);
</script>

<nav class="sticky top-0 z-10 bg-gray-800">
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
			class="sticky top-16 z-50 flex w-full flex-col gap-3 rounded-md bg-white px-4 py-5 text-center font-bold shadow-[0px_0px_15px_rgba(0,0,0,0.09)] dark:bg-gray-800 dark:text-white"
		>
			Total MDC
			<div
				class="flex w-[200px] flex-col gap-3 self-center rounded-md bg-white px-4 py-5 text-center font-bold shadow-[0px_0px_15px_rgba(0,0,0,0.09)] dark:bg-blue-800 dark:text-white"
			>
				{formatNumber(totalMDC)}
			</div>
		</div>
		<p class="mt-4">equipment</p>
		<div
			class="mt-5 flex grid grid-cols-2 flex-col gap-1.5 gap-3 border-y-1 border-slate-500 px-2 py-4 xl:grid-cols-5"
		>
			{#each equCards as card, index}
				<EquipCard
					itemType={card.itemType}
					rarity={card.rarity}
					level={card.level}
					mdcValue={formatNumber(card.mdcValue)}
					img={card.img}
					on:save={(event) => handleEquSave(event, index)}
				/>
			{/each}
		</div>

		<div class="flex w-80 flex-col gap-2 xl:w-200 xl:flex-row">
			<div>
				<p class="mt-4">Soul</p>
				<div
					class="mt-5 flex grid grid-cols-2 flex-col gap-1.5 gap-3 border-y-1 border-slate-500 px-2 py-4 xl:grid-cols-3"
				>
					<SoulCard
						soulTitle={soulCards[0].soulTitle}
						soulType={soulCards[0].soulType}
						mdcValue={formatNumber(soulCards[0].mdcValue)}
						defaultImg={soulCards[0].defaultImg}
						img={soulCards[0].img}
						on:save={(event) => handleSoulSave(event, 0)}
					/>

					{#each soulCards.slice(1) as card, index}
						<SoulCard
							soulTitle={card.soulTitle}
							soulType={card.soulType}
							mdcValue={formatNumber(card.mdcValue)}
							defaultImg={card.defaultImg}
							img={card.img}
							on:save={(event) => handleSoulESave(event, index + 1)}
						/>
					{/each}
				</div>
			</div>

			<div class="w-88">
				<p class="mt-4">Commander Set</p>
				<div
					class="mt-5 flex grid grid-cols-2 flex-col gap-1.5 gap-3 border-y-1 border-slate-500 px-2 py-4 xl:grid-cols-3"
				>
					{#each commanderCards as card, index}
						<CommanderCard
							comTitle={card.comTitle}
							comType={card.comType}
							mdcValue={formatNumber(card.mdcValue)}
							img={card.img}
							on:save={(event) => handleCommanESave(event, index)}
						/>
					{/each}
				</div>
			</div>
		</div>
		<p class="mt-4">Legion</p>
		<div
			class="mt-5 flex grid grid-cols-2 flex-col gap-1.5 gap-3 border-y-1 border-slate-500 px-2 py-4 xl:grid-cols-5"
		>
			{#each legionCards as card, index}
				<LegionCard
					legionType={card.legionType}
					legionTitle={card.legionTitle}
					mdcValue={formatNumber(card.mdcValue)}
					img={card.img}
					on:save={(event) => handleLegionSave(event, index)}
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
