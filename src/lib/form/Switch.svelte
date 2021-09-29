<script lang="ts">
	export let checked = false;
	export let id = '';
</script>

<div class="switch">
	<input {checked} on:change {id} type="checkbox" class="switch-input" />
	<label for={id} class="switch-label">Switch</label>
</div>

<style>
	.switch {
		position: relative;
		display: inline-block;
	}

	.switch-input {
		display: none;
	}

	.switch-label {
		display: block;
		width: var(--switch-width);
		height: var(--switch-height);
		text-indent: -150%;
		clip: rect(0 0 0 0);
		color: transparent;
		user-select: none;
	}

	.switch-label:before,
	.switch-label:after {
		content: '';
		display: block;
		position: absolute;
		cursor: pointer;
	}

	.switch-label:before {
		width: 100%;
		height: 100%;
		background-color: var(--grey);
		border-radius: 9999em;
		transition: background-color 0.25s ease;
	}

	.switch-label:after {
		top: 0;
		left: 0;
		width: var(--switch-height);
		height: var(--switch-height);
		border-radius: 50%;
		background-color: #fff;
		transition: left 0.25s ease;
	}

	.switch-input:checked + .switch-label:before {
		background-color: var(--purple);
	}

	.switch-input:checked + .switch-label:after {
		left: var(--switch-height);
	}
</style>
