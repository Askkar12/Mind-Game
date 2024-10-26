
import { useEffect, useMemo, useState } from 'react';
import './App.css'
import Confetti from 'react-confetti'


const gameicons=["🎉","🥊","🌹","🎁","🚊","🙌","👀","✨","🤷‍♂️","🍄","🍰","🚢"];

function App() {
  const [pieces,setpieces]=useState([]);
  
  const isgamecompleted = useMemo(
    ()=>pieces.length > 0 && pieces.every((piece)=>piece.solved),
    
 [pieces]);


  // console.log(gameicons);

  const startgame = () => {
      const duplicategameicons=gameicons.concat(gameicons);
      // console.log(duplicategameicons);
      const newgameicons=[]

      while(newgameicons.length < gameicons.length *2){
        const randomindex=Math.floor(Math.random() *duplicategameicons.length)
        newgameicons.push( {
          emoji:duplicategameicons[randomindex],
          flipped:false,
          solved:false,
          position:newgameicons.length,
        });
        duplicategameicons.splice(randomindex, 1)
      }

        setpieces(newgameicons);
      
  };
  useEffect( () => {
    startgame();
  },[]);

  const handleActive = (data) => {
    const flippeddata = pieces.filter((data)=>data.flipped && !data.solved);
    if(flippeddata.length ===2) return;
    const newpieces = pieces.map((piece) => {
      if (piece.position === data.position) {
        // Correctly toggle the flipped state
        return { ...piece, flipped: !piece.flipped };
      }
      return piece;
    });
    setpieces(newpieces);
  };
 const gamelogicforflipped = () => {
   const flippeddata= pieces.filter((data)=> data.flipped && !data.solved);

   if(flippeddata.length === 2){
    setTimeout(()=> {
      if(flippeddata[0].emoji === flippeddata[1].emoji){
        setpieces(pieces.map((piece)=>{
          if(piece.position === flippeddata[0].position||piece.position === flippeddata[1].position){
            piece.solved=true;
          }
          return piece;
        }))
        
      }else{
        setpieces(pieces.map((piece)=>{
          if(piece.position === flippeddata[0].position||piece.position === flippeddata[1].position){
            piece.flipped=false;
          }
          return piece;
        }))
      }
    },800)
   }

 };


 useEffect(()=>{
  gamelogicforflipped();
 },[pieces]);
 
//  console.log(isgamecompleted);
 
  
    
    

  return (
    <main >
      <h1>Memory Game</h1>
      <div className="container">
        {pieces.map((data,index)=>(
           <div className={`flip-card ${data.flipped || data.solved ? "active" : ""}`} 
           key={index} 
           onClick={() => handleActive(data)}>
           <div className="flip-card-inner">
             <div className="flip-card-front"/>
             <div className="flip-card-back">{data.emoji}</div>
             </div>
             </div>

        ))}
     
    
 
      </div>
      {isgamecompleted && (
           <div className="game-completed">
              <h1>YOU WIN!!!</h1>
            <Confetti
         width={window.innerWidth}
         height={window.innerHeight}
       />
         </div>
      )} 
    </main>
  )
}

export default App
