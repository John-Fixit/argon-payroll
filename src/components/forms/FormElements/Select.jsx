export default function Select(){
    return(
        <>
            <div className="relative inline-block">
  <select id="mySelect" className="appearance-none border border-gray-300 rounded py-2 px-4 bg-white transition duration-300">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </select>
  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 12l-6-6H4l6 6 6-6h-2l-6 6z"/></svg>
  </div>
</div>
        </>
    )
}