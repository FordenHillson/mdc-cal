<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let legionTitle: string; // Title of the soul card
	export let legionType: string;
	export let mdcValue: string;
	export let img: string;
	export let defaultImg: string; // Default image URL

	let showPopup = false;
	let selectedImg = img; // Track the selected image during editing

	const dispatch = createEventDispatcher(); // Event dispatcher

	function saveChanges() {
		// Update the image with the selected legion image
		img = selectedImg;
		showPopup = false;

		// Emit the updated data to the parent
		dispatch('save', { legionTitle, legionType, img });
	}

	// Update selectedImg when legionType changes
	function updateSelectedImage(newType: string, newImg: string) {
		legionType = newType;
		selectedImg = newImg;
	}

	const legionOption = [
		{ name: 'none', img: 'https://static.wikia.nocookie.net/maplestory/images/a/a7/Nameless_Legion_Rank_1.png'},
		{ name: '1,900', img:'https://static.wikia.nocookie.net/maplestory/images/e/ec/Renowned_Legion_Rank_3.png'},
		{ name: '2,400', img:'https://static.wikia.nocookie.net/maplestory/images/4/43/Renowned_Legion_Rank_5.png'},
		{ name: '3,000', img:'https://static.wikia.nocookie.net/maplestory/images/d/d6/Heroic_Legion_Rank_2.png'},
		{ name: '3,600', img:'https://static.wikia.nocookie.net/maplestory/images/4/45/Heroic_Legion_Rank_4.png'},
		{ name: '4,200', img:'https://static.wikia.nocookie.net/maplestory/images/f/f1/Legendary_Legion_Rank_1.png'},
		{ name: '5,000', img:'https://static.wikia.nocookie.net/maplestory/images/4/4c/Legendary_Legion_Rank_4.png'},
		{ name: '6,000', img:'https://static.wikia.nocookie.net/maplestory/images/9/94/Legendary_Legion_Rank_5.png'},
		{ name: '7,500', img:'https://static.wikia.nocookie.net/maplestory/images/c/cd/Supreme_Legion_Rank_2.png'},
		{ name: '8,900', img:'https://static.wikia.nocookie.net/maplestory/images/e/eb/Supreme_Legion_Rank_4.png'},
	];
</script>

<div
	class="h-60 w-34 transform rounded-lg border-1 border-zinc-700 bg-white bg-zinc-800 shadow-lg transition duration-300 hover:scale-110 hover:shadow-xl flex flex-col"
>
	<div class="flex h-2/6 items-center justify-center rounded-lg mt-4">
		<img src={selectedImg} alt="itemPlaceholder" class="w-20" />
	</div>

	<div class="flex flex-col px-5 mt-4 ">
		<h2 class="font-semibold text-xs">{legionTitle}</h2>
		<h2 class="font-semibold text-sm">{legionType}</h2>
		<div class="flex flex-row items-center justify-start text-sm mt-2">
			<p class="">MDC:</p>
			<p class="ml-2">{mdcValue}</p>
		</div>
		<button
			class="mt-2 cursor-pointer rounded-md bg-blue-500 px-2 py-1 text-white transition duration-150 hover:bg-blue-700"
			type="button"
			on:click={() => (showPopup = true)}
		>
			Edit
		</button>
	</div>
</div>

{#if showPopup}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/70">
		<div class="rounded-lg bg-slate-900 p-4 shadow-lg">
			<h3 class="mb-2 text-lg font-semibold text-white">Edit Item</h3>
			<p class="text-l mb-2 text-center font-semibold text-white">{legionType}</p>
			<div class="mb-2 flex items-center justify-center">
				<img src={selectedImg} alt="itemPlaceholder" class="border-default mb-2 rounded-lg w-20" />
			</div>
			<div class="mb-2">
				<label class="block text-sm font-medium text-white">Legion Level</label>
				<div class="mt-1 grid grid-cols-5 gap-2">
					{#each legionOption as option}
						<button
							type="button"
							class="rounded-md border p-2 text-sm text-white flex justify-center {legionType === option.name
								? 'border-blue-400 bg-blue-600'
								: 'border-zinc-700 bg-zinc-900'}"
							on:click={() => updateSelectedImage(option.name, option.img)}
						>
							<img src={option.img} alt={option.name} class="h-8 w-8 rounded-md" />
						</button>
					{/each}
				</div>
			</div>

			<div class="flex justify-end space-x-2">
				<button
					class="rounded-md bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-700"
					on:click={() => {
						legionType = 'None'  // Default type
						mdcValue = 0;	 // Default mdc
						selectedImg = 'https://static.wikia.nocookie.net/maplestory/images/a/a7/Nameless_Legion_Rank_1.png'; // Reset to original image
					}}
				>
					Reset
				</button>
				<button
					class="rounded-md bg-gray-300 px-3 py-1 text-sm text-black hover:bg-gray-400"
					on:click={() => (showPopup = false)}
				>
					Cancel
				</button>
				<button
					class="rounded-md bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-700"
					on:click={saveChanges}
				>
					Save
				</button>
			</div>
		</div>
	</div>
{/if}
