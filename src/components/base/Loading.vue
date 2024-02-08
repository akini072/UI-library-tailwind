<template>
    <div class="loading">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
             style="margin: auto; background: none; display: block; shape-rendering: auto;"
             width="100px" height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <circle cx="50" cy="50" fill="none" stroke="#4368e0" stroke-width="2" r="15"
                    stroke-dasharray="70.68583470577033 25.561944901923447" transform="rotate(73.7169 50 50)">
<!--	            Freezes when loading, using CSS instead. -->
<!--                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="0.6134969325153374s"-->
<!--                                  values="0 50 50;360 50 50" keyTimes="0;1"/>-->
            </circle>
        </svg>
    </div>
</template>

<script>
export default {
    name: 'Loading'
}
</script>
<style lang="scss" scoped>
.loading:not(.button) {
	position: absolute;
	background: #fff;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 5;
	display: flex;
	justify-content: center;
	align-items: center;
}
.loading svg {
	animation: spin .5s infinite linear;

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(359deg);
		}
	}
}
</style>
