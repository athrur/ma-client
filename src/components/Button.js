
function Button({ children }) {
    return <button type="button" disabled={true} class="cursor-not-allowed disabled bg-bbblue text-white font-bold py-3 px-4 border-black border-2">
        {children ? children : "Button"}
    </button>;
}

export default Button;