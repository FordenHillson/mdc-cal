<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let comTitle: string; // Title of the soul card
	export let comType: string;
	export let mdcValue: string;
	export let img: string;

	let showPopup = false;
	let selectedImg = img;

	const dispatch = createEventDispatcher(); // Event dispatcher

	function saveChanges() {
		// Update the image with the selected boss image
		showPopup = false;

		// Emit the updated data to the parent
		dispatch('save', { comTitle, comType, img });
	}

	// Update selectedImg when soulType changes
	function updateSelectedImage(newType: string, newImg: string) {
		comType = newType;
		selectedImg = newImg;
	}

	const comOption = [
		{ name: 'none', img: 'https://www.grandislibrary.com/images/equipment/ifias-necklace.png' },
		{ name: 'FullSet', img: 'https://media.maplestorywiki.net/yetidb/Eqp_Dominator_Pendant.png' },
		
	];
</script>

<div
	class="h-60 w-36 transform rounded-lg border-1 border-zinc-700 bg-white bg-zinc-800 shadow-lg transition duration-300 hover:scale-110 hover:shadow-xl flex flex-col justify-around"
>
	<div class="flex h-1/5 items-center justify-center rounded-lg">
		<img src={selectedImg} alt="itemPlaceholder" class="w-20" />
	</div>

	<div class="flex flex-col px-5 ">
		<h2 class="font-semibold text-xs">{comTitle}</h2>
		<h2 class="font-semibold text-sm">{comType}</h2>
		<div class="flex flex-row items-center justify-start text-sm">
			<p class="">MDC:</p>
			<p class="ml-2">{mdcValue}</p>
		</div>
		<button
			class="mt2 cursor-pointer rounded-md bg-blue-500 px-2 py-1 text-white transition duration-150 hover:bg-blue-700"
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
			<p class="text-l mb-2 text-center font-semibold text-white">{comType}</p>
			<div class="mb-2 flex items-center justify-center">
				<img src={selectedImg} alt="itemPlaceholder" class="border-default mb-2 rounded-lg w-20" />
			</div>
			<div class="mb-2">
				<label class="block text-sm font-medium text-white">Set</label>
				<div class="mt-1 grid grid-cols-5 gap-2">
					{#each comOption as option}
					<button 
						type="button"
						class="p-2 text-sm text-white rounded-md border"
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
						comType = 'None'  // Default type
						mdcValue = '0';	 // Default mdc
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
