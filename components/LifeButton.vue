<template>
    <div>
        <v-btn v-on:click="onButtonClick">
			<span v-if="amount>0">+</span>{{amount}}
		</v-btn>
    </div>
</template>

<script>
export default {
	props: {
		amount: Number
	},
	name: "life-button",
	methods: {
		onButtonClick (event) {
			this.$emit('life-change', this.amount)
		}
	}
}
</script>

