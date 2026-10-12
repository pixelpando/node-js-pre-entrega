const [, , method, route, ...args] = process.argv

const [resource, id] = route.split("/")

// console.log(`Resource: ${resource}`)
// console.log(`ID: ${id}`)
// console.table(process.argv)

const BASE_URL = "https://fakestoreapi.com"

const request = async (URL, options = {}) => {
    const response = await fetch (URL, options)

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return await response.json()
}

try {
    if (method === "GET") {
        if (id) {
            const data = await request(`${BASE_URL}/${resource}/${id}`)
            console.log(data)
        } else {
            const data = await request(`${BASE_URL}/${resource}`)
            console.log(data)
        }
    } else if (method === "POST") {
        const [title, price, category] = args

        if (!title || !price || !category) {
            throw new Error(`Title, price and category are required for POST request on ${resource}`)
        }

        const data = await request(`${BASE_URL}/${resource}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, price, category }),
        })

        console.log(data)
    } else if (method === "DELETE") {
        if (!id) {
            throw new Error(`ID is required for DELETE request on ${resource}`)
        }

        await request(`${BASE_URL}/${resource}/${id}`, { method: "DELETE" })
        console.log(`The item ${id} was deleted`)
    } else {
        throw new Error(`Unsupported method: ${method}`)
    }
} catch (error) {
    console.log(error.message)
}