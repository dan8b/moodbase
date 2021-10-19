<template>
    <svg  @click="toggleGrid()" xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 302 302">
    <g class="w-max hover:fill-current text-gray-400" id="Rectangle_1" data-name="Rectangle 1" fill="#fff" stroke="#707070" stroke-width="1">
        <rect width="300" height="300" stroke="none"/>
        <rect x="0.5" y="0.5" width="300" height="300" fill="none"/>
    <text id="sad_anxious" data-name="sad;anxious" transform="translate(36 57)" 
            font-size="64" font-family="SegoeUI, Segoe UI">
        <tspan :fill="fill1" x="0" y="69">{{emotion1}};</tspan>
        <tspan :fill="fill2" x="0" y="154">{{emotion2}}</tspan></text>
        </g>

    </svg>
</template>

<script>
export default {
    name: 'PlotBox2',
    props: {
        emotion1:
            {
                required: true,
                type: String
            },
        emotion2:
            {
                required: true,
                type: String
            },
        fill1:
            {
                required: true,
                type: String
            },
        fill2:
            {
                required: true,
                type: String
            },        
        },
    setup(props) {
        
    }
    
}
</script>

<style>

</style>