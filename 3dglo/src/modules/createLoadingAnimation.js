const createLoadingAnimation = () => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
            .loading {
                flex: 1 1 25%;  
            }
            .sk-wandering-cubes {
                width: 4em;
                height: 4em;
                position: relative;
                margin: auto;
            }
            .sk-wandering-cubes .sk-cube {
                background-color: #19b5fe;
                width: 1.5em;
                height: 1.5em;
                position: absolute;
                top: 0;
                left: 0;
                animation: sk-wandering-cubes 1.8s ease-in-out -1.8s infinite both;
            }
            .sk-wandering-cubes .sk-cube-2 {
                animation-delay: -0.9s;
            }
            @keyframes sk-wandering-cubes {
                0% {
                    transform: rotate(0deg);
                }
                25% {
                    transform: translateX(2em) rotate(-90deg) scale(0.5);
                }
                50% {
                    /* Hack to make FF rotate in the right direction */
                    transform: translateX(2em) translateY(2em) rotate(-179deg);
                }
                50.1% {
                    transform: translateX(2em) translateY(2em) rotate(-180deg);
                }
                75% {
                    transform: translateX(0) translateY(2em) rotate(-270deg) scale(0.5);
                }
                100% {
                    transform: rotate(-360deg);
                }
            }
        `;
    document.head.appendChild(styleSheet);

    return `
            <section class="loading">
                <div class="sk-wandering-cubes">
                    <div class="sk-cube sk-cube-1"></div> 
                    <div class="sk-cube sk-cube-2"></div>
                </div>
            </section>
        `;
};

export default createLoadingAnimation;
