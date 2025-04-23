<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let soulTitle: string; // Title of the soul card
	export let soulType: string;
	export let mdcValue: string;
	export let img: string;
	export let defaultImg: string; // Default image URL

	let showPopup = false;
	let selectedImg = img; // Track the selected image during editing

	const dispatch = createEventDispatcher(); // Event dispatcher

	function saveChanges() {
		// Update the image with the selected boss image
		img = selectedImg;
		showPopup = false;

		// Emit the updated data to the parent
		dispatch('save', { soulTitle, soulType, img });
	}

	// Update selectedImg when soulType changes
	function updateSelectedImage(newType: string, newImg: string) {
		soulType = newType;
		selectedImg = newImg;
	}

	const soulOption = [
		{ name: 'Von Leon', img: 'https://media.maplestorywiki.net/yetidb/Use_Von_Leon_Soul.png' },
		{ name: 'Von Bon', img: 'https://media.maplestorywiki.net/yetidb/Use_Von_Bon_Soul.png' },
		{ name: 'Pierre', img: 'https://media.maplestorywiki.net/yetidb/Use_Pierre_Soul.png' },
		{ name: 'Crimson Queen', img: 'https://media.maplestorywiki.net/yetidb/Use_Crimson_Queen_Soul.png' },
		{ name: 'Hilla', img: 'https://media.maplestorywiki.net/yetidb/Use_Hilla_Soul.png' },
		{ name: 'Vellum', img: 'https://media.maplestorywiki.net/yetidb/Use_Vellum_Soul.png' },
		{ name: 'Magnus', img: 'https://media.maplestorywiki.net/yetidb/Use_Magnus_Soul.png' },
		{ name: 'Arkarium', img: 'https://media.maplestorywiki.net/yetidb/Use_Arkarium_Soul.png' },
		{ name: 'Lotus', img: 'https://media.maplestorywiki.net/yetidb/Use_Magnificent_Lotus_Soul.png' },
		{ name: 'Damien', img: 'https://media.maplestorywiki.net/yetidb/Use_Magnificent_Damien_Soul.png' },
		{ name: 'Lucid', img: 'https://media.maplestorywiki.net/yetidb/Use_Magnificent_Lucid_Soul.png' },
		{ name: 'Will', img: 'https://media.maplestorywiki.net/yetidb/Use_Magnificent_Will_Soul.png' },
	];
</script>

<div
	class="h-60 w-34 transform rounded-lg border-1 border-zinc-700 bg-white bg-zinc-800 shadow-lg transition duration-300 hover:scale-110 hover:shadow-xl flex flex-col justify-around"
>
	<div class="flex h-1/5 items-center justify-center rounded-lg">
		<img src={selectedImg} alt="itemPlaceholder" class="w-20" />
		<img src={defaultImg} alt="default" class="absolute bottom-36 right-6 w-12 opacity-100" />
	</div>

	<div class="flex flex-col px-5 ">
		<h2 class="font-semibold text-xs">{soulTitle}</h2>
		<h2 class="font-semibold text-sm">{soulType}</h2>
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
			<p class="text-l mb-2 text-center font-semibold text-white">{soulType}</p>
			<div class="mb-2 flex items-center justify-center">
				<img src={selectedImg} alt="itemPlaceholder" class="border-default mb-2 rounded-lg w-20" />
			</div>
			<div class="mb-2">
				<label class="block text-sm font-medium text-white">Soul Boss</label>
				<div class="mt-1 grid grid-cols-6 gap-2">
					{#each soulOption as option}
						<button
							type="button"
							class="rounded-md border p-2 text-sm text-white flex justify-center {soulType === option.name
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
						soulType = 'Boss'  // Default type
						mdcValue = 0;	 // Default mdc
						selectedImg = 'https://i.imgur.com/pcDNKj8.png'; // Reset to original image
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
