import { Button, Input } from "@nextui-org/react"


const EmbassyTextForm = () => {
  return (
    <div>
    <form action="" className="p-8 w-full">
        <div className="my-3">
          <label htmlFor="mbname">Embassy Name</label>
          <Input
            id="mbname"
            type="text"
            className="rounded-sm"
            labelPlacement="ouside"
          />
        </div>
        <div className="flex justify-end">
          <Button
            color="success"
            className="my-4  text-white rounded"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EmbassyTextForm