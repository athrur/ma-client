function Select({ children}) {
  return (
    <select defaultValue={"Select"} disabled={true} class="appearance-none cursor-not-allowed rounded-none bg-bborange text-gray-700 font-bold border-2 border-black py-5 w-full text-center align-middle content-center px-3">
        {children ? children : <option value="Select">{"> "} Select</option>}
    </select>
    );
}
export default Select;