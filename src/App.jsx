import React, { useEffect, useState } from 'react'

const App = () => {

    const [card, setcard] = useState([])
    const [page, setpage] = useState(1)

    const getCardData = async () => {
        const res = await fetch(`https://picsum.photos/v2/list?limit=12&page=${page}`)
        console.log(res);
        const data = await res.json();

        setcard((prev) => [...prev, ...data])
    }

    useEffect(() => {
        getCardData();
    }, [page])

    const scrollingHandle = async () => {
        try {
            if (Window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.scrollHeight) {
                setpage((prev) => prev + 1)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', scrollingHandle)
        return () => { window.removeEventListener("scroll", scrollingHandle) }
    }, [])


    return (
        <>
            <h1 className='heading'>Random Pics</h1>
            {
                card.map((curVal, id) => {
                    return <img src={curVal.download_url} key={id} width={300} height={280} />
                })
            }
        </>
    )
}

export default App;