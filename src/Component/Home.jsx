import React, { useEffect, useState } from 'react';
import Data from "../Data";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';


const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};






const Home = () => {




    const [loading, setLoading] = useState(true);  // State for loading

    // Run once when the component mounts
   



   

    const [search, setSearch] = useState("");
    const [allItems, setAllItems] = useState(Data);  // Original data
    const [displayedItems, setDisplayedItems] = useState(Data);  // Displayed/filtered data

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        const filtered = allItems.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
        setDisplayedItems(filtered);
    }, [search]);

    const onDragEnd = (result) => {
        if (!result.destination) return;
        if (result.destination.index === result.source.index) return;
        const projects = reorder(displayedItems, result.source.index, result.destination.index);
        setDisplayedItems(projects);
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);  // Hide loader after 3 seconds
        }, 4000);

        return () => clearTimeout(timer);  // Clear timer on unmount
    }, []);

    // If loading, show loader
    if (loading) {
        return <div className="loader"></div>;
    }

    return (
        <>
            <main>
                    <section className='bg-slate-700 py-[2rem] px-[2rem]  header  fixed w-[100%] top-0 ' >
                  <section className='flex justify-around'>
                    <div className="logo hidden">
                        <h1 className='text-[25px] text-slate-100 capitalize '>Logo</h1>
                    </div>

                    <section className="inputContainer">
                    <input onChange={handleSearch}  value={search}  
                     className="placeholder:italic placeholder:text-slate-400 block bg-white lg:w-[40rem]
                      border border-slate-300 w-full rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1
                     sm:text-sm" placeholder="Search for anything..." type="search" name="search"/>

                    </section>
                    <section className='flex  space-x-8 hidden'>
                        <a href="#" className="links block text-[20px] text-slate-100 capitalize ">home</a>
                        <a href="#" className="links block text-[20px] text-slate-100 capitalize ">account</a>
                        <a href="#" className="links block text-[20px] text-slate-100 capitalize ">log out</a>
                    </section>
                  </section>
            </section> 
                
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable" direction='horizontal'>
                        {(provided, snapshot) => (
                            <figure 
                                ref={provided.innerRef}
                                style={{ backgroundColor: snapshot.isDraggingOver ? 'green' : 'white' }}
                                {...provided.droppableProps}
                                className="imgContainer flex flex-wrap justify-center pt-[6rem]"
                            >
                                {displayedItems.map((image, index) => (
                                    <Draggable draggableId={image.id} key={image.id} index={index}>
                                        {(provided, snapshot) => (
                                            <div 
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className='w-[150px] h-[200px] shadow1 mx-[1rem] my-[1rem] lg:w-[280px] lg:h-[300px] 
                                                '
                                            >
                                                <img src={image.cover} alt=""  className='h-[auto]'/>
                                                <figcaption>
                                                    <h3>{image.name}</h3>
                                                    {/* <h3>{image.Tag}</h3> */}
                                                </figcaption>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </figure>
                        )}
                    </Droppable>
                </DragDropContext>
                
                <button className='bg-red-500 py-5 px-5'
                onClick={() => logout({ returnTo: window.location.origin })}>
                    Log Out
                </button>
            </main> 
        </>
    );
};

export default Home;

    
      
         
           