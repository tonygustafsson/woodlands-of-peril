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
		width: 48px;
		height: 24px;
		text-indent: -150%;
		clip: rect(0 0 0 0);
		color: transparent;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
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
		background-color: #222;
		border-radius: 9999em;
		transition: background-color 0.25s ease;
	}

	.switch-label:after {
		top: 0;
		left: 0;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background-color: #fff;
		box-shadow: 0 0 2px rgba(0, 0, 0, 0.45);
		transition: left 0.25s ease;
	}

	.switch-input:checked + .switch-label:before {
		background-color: #574159;
	}

	.switch-input:checked + .switch-label:after {
		left: 24px;
	}
</style>
