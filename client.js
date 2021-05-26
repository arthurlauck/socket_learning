async function main() {
    const net = require('net')
    const readLine = require('readline')

    const client = new net.Socket()

    // Ask for the user input the name to identify
    function askForName() {
        const rlQuestion = readLine.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        return new Promise(resolve => rlQuestion.question('Digite seu nome: ', inputName => {
            rlQuestion.close();
            resolve(inputName);
        }))
    }

    const name = await askForName()


    // Start reading inputs and outputs
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    client.connect(4000, '127.0.0.1', () => {
        console.log('connected')

        // When receiving data, show
        client.on('data', data => {
            object = JSON.parse(data.toString())
            console.log(`[${object.name}]: ${object.message}`)
        })

        // When user type a line, send to the server
        rl.addListener('line', line => {
            if (line === 'FIM') {
                client.end()
                rl.close()
                return
            }

            client.write(JSON.stringify({ name: name, message: line }))
        })
    })
}

main()