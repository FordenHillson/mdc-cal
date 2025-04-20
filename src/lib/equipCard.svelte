<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let itemType: string;
    export let rarity: string;
    export let level: number;
    export let mdcValue: number;
	export let img : string;

    let showPopup = false;
    let newRarity = rarity;
    let newLevel = level;

    const dispatch = createEventDispatcher(); // Event dispatcher

    function saveChanges() {
        rarity = newRarity;
        level = newLevel;
        showPopup = false;

        // Emit the updated data to the parent
        dispatch('save', { itemType, rarity, level });
    }

    function getBorderClass(newRarity: string): string {
        if (newRarity === "Mythic") return "border-mythic";
        if (newRarity === "Ancient" || newRarity === "Necro" || newRarity === "Root Abyss") return "border-Ancient";
        if (newRarity === "Chaos" || newRarity === "AbsoLab") return "border-Chaos";
        return "border-default";
    }
</script>

<div
	class="h-60 w-36 transform rounded-lg bg-white shadow-lg transition duration-300 hover:scale-110 hover:shadow-xl bg-zinc-800 border-1 border-zinc-700"
>
	<div class="m-2 h-2/5 rounded-lg flex items-center justify-center">
		<div class="w-26 h-26 bg-zinc-900 rounded-lg {getBorderClass(newRarity)}"></div>
		<img src={img} alt="" class="w-20 absolute">
	</div>
	<div class="flex flex-col px-5 pt-2">
		<h2 class="font-semibold">{itemType}</h2>
		<div class="flex flex-row items-center justify-start text-sm">
			<p class="">{rarity}</p>
			<p class="ml-2">LV.{level}</p>
		</div>
		<div class="flex flex-row items-center justify-start text-sm">
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
			<p class="text-center font-semibold text-l mb-2 text-white">{itemType}</p>
			<div class="mb-2 flex items-center justify-center">
				<img src="https://placehold.co/200" alt="itemPlaceholder" class="mb-2 rounded-lg {getBorderClass(newRarity)}" />
			</div>
			<div class="mb-2">
				<label class="block text-sm font-medium text-white">Rarity</label>
				<div class="grid grid-cols-3 gap-2 mt-1">
					{#each ['Mythic', 'Ancient', 'Necro', 'Root Abyss', 'Chaos', 'AbsoLab'] as option}
						{#if !(itemType === 'Top' || itemType === 'Bottom') || !['Mythic', 'Ancient', 'Necro', 'Chaos', 'AbsoLab'].includes(option)}
							{#if !(itemType === 'Outfit' && option === 'Root Abyss')}
								{#if !((['Glove', 'Shoulder', 'Shoes', 'Belt', 'Cape'].includes(itemType)) && option === 'Root Abyss')}
									<button 
										type="button"
										class="p-2 text-sm text-white rounded-md border {newRarity === option ? 'bg-blue-600 border-blue-400' : 'bg-zinc-900 border-zinc-700'}"
										on:click={() => newRarity = option}
									>
										{option}
									</button>
								{/if}
							{/if}
						{/if}
					{/each}
				</div>
			</div>
			<div class="mb-2">
				<label class="text-white block text-sm font-medium text-white-700">Level</label>
				<div class="flex items-center space-x-2">
					<input
						type="range"
						bind:value={newLevel}
						min={newRarity === 'Mythic' ? 30 : newRarity === 'Ancient' || newRarity === 'Necro' || newRarity === 'Root Abyss' ? 30 : 40}
						max={newRarity === 'Mythic' ? 40 : newRarity === 'Ancient' || newRarity === 'Necro' || newRarity === 'Root Abyss' ? 50 : 60}
						step="2"
						class="w-full h-2 rounded-lg appearance-none cursor-pointer bg-zinc-700"
					/>
					<span class="text-white w-8 text-center">{newLevel}</span>
				</div>
			</div>
			<div class="flex justify-end space-x-2">
				<button
					class="rounded-md bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-700"
					on:click={() => {
						newRarity = '';  // Default rarity
						newLevel = 0;
						mdcValue=0;         // Default level
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
