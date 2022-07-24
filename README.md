# Introduction
This API needs to take in path data from LYNX, transform it into the format that MyScript expects.

# Data
The incoming data is structures as follows:
`[
	{
	 	x: [123, 112, 445, 334],
		y: [923, 612, 845, 734],
	},
	{
		x: [123, 112, 445, 334],
		y: [923, 612, 845, 734],
	},
	{
		x: [123, 112, 445, 334],
		y: [923, 612, 845, 734],
	}
]
`

Then construct the requestBody object to post to MyScript based on their API:

  https://swaggerui.myscript.com/#/Batch_mode/batch

There are TODO statements in the recognition.ts file. Complete these for the solution.

# You can call the following commandsYou can call the following commands

To install the dependencies
`npm run install`

To build the TypeScript changes
`npm run build`

To run the web service
`npm run start`

To trigger a test of the endpoint
`npm run test`

