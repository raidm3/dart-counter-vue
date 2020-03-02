<template>
    <span>{{ animatedNumber }}</span>
</template>

<script>
export default {
    name: 'AnimatedNumber',

    props: {
        number: {
            type: Number,
            default: 0,
        },
    },

    data() {
        return {
            animatedNumber: 0,
            interval: false,
        };
    },

    created() {
        this.animatedNumber = this.number ? this.number : 0;
    },

    watch: {
        number() {
            clearInterval(this.interval);

            if (this.number == this.animatedNumber) {
                return;
            }

            this.interval = window.setInterval(() => {
                if (this.animatedNumber != this.number) {
                    let change = (this.number - this.animatedNumber) / 10;

                    change = change >= 0 ? Math.ceil(change) : Math.floor(change);
                    this.animatedNumber += change;
                }
            }, 20);
        }
    },
}
</script>