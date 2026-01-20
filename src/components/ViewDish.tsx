import { motion, type Variants } from "motion/react";
// import { MotionContainer, PopIn, FadeIn, SlideIn } from "../animations/motion";
import type { PropType } from "../types"
import { useState, type MouseEvent } from "react"
import useIsDesktop from "../hooks/useIsDesktop"
// import Plus from "/images/plus.png"
// import minus from "/images/minus.png"
import Plus from "/images/plus.svg"
import minus from "/images/minus.svg"
import Cancel from "/images/Cancel.png"
import Check from "/images/Checkbox.png"

export type ViewDishProps = {
  item: PropType | null;
  onClose: () => void;
  onAddToOrder?: (order: any) => void;
}

const display = (isDesktop: boolean): Variants => {
  if (isDesktop) {
    // slide in from the RIGHT on desktop
    return {
        hidden: { x: "100vw", opacity: 0 },
        visible: {
          x: "0",
          opacity: 1,
          transition: { duration: 0.25 }
        },
        exit: { x: "100vw", opacity: 0 }
    };
  }
  
  // MOBILE — slide from bottom
  return {
      hidden: { y: "100vh", opacity: 0 },
      visible: {
          y: "0",
          opacity: 1,
          transition: { duration: 0.25 }
      },
      exit: { y: "100vh", opacity: 0 }
  };
}

const ViewDish: React.FC<ViewDishProps> = ({ item, onClose, onAddToOrder }) => {
  const isDesktop = useIsDesktop();

  if (!item) return null;

  // track selected topping ids in a Set for multiple independent checks
  const [selectedToppings, setSelectedToppings] = useState<Set<number>>(() => new Set())

  const toggleCheck = (id: number) => {
    setSelectedToppings(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        // unchecking: remove from selected set and remove any stored counts
        next.delete(id)
        setToppingCounts(prevCounts => {
          const nextCounts = { ...prevCounts }
          delete nextCounts[id]
          return nextCounts
        })
      } else {
        next.add(id)
      }
      return next
    })
  }
  
  // format prices to two decimals
  const formatPrice = (n: number) => `$${n.toFixed(2)}`
  const [count, setCount] = useState(1);
  const Increment = () => setCount(c => c + 1);
  const Decrement = () => setCount(c => Math.max(0, c - 1));
  // track individual counts per topping (keyed by topping id)
  const [toppingCounts, setToppingCounts] = useState<Record<number, number>>({})

  const incrementTopping = (id: number) => {
    setToppingCounts(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
  }

  const decrementTopping = (id: number) => {
    setToppingCounts(prev => {
      const current = prev[id] || 0
      if (current <= 1) {
        const next = { ...prev }
        delete next[id]
        return next
      }
      return { ...prev, [id]: current - 1 }
    })
  }

  // calculate sum of toppings
  // when a topping is unchecked its (price * qty) will be subtracted
  const toppingsTotal = item.toppings.reduce((sum, t) => {
    const qty = toppingCounts[t.id] || 0
    if (!selectedToppings.has(t.id)) return sum
    return sum + t.price * qty
  }, 0)

  return (
    <motion.div
      onClick={(e: MouseEvent) => e.stopPropagation()}
      variants={display(isDesktop)}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="z-50 fixed right-0 w-full min-h-screen sm:w-[55%] md:w-[45%] lg:w-[37%] top-[15%] bottom-0 sm:top-0 sm:bottom-0 rounded-t-2xl sm:rounded-tr-none sm:rounded-l-2xl bg-[#f7f7f7] dark:bg-[#32324D]"
    >
      <div className="flex flex-col h-full text-neutral-800 dark:text-white">
        <div onClick={onClose} className="top-0 my-2 mx-auto w-[134px] h-[5px] bg-[#C0C0CF] rounded-sm sm:hidden" />

        <motion.img whileTap={{ scale: 0.96 }} onClick={onClose} src={Cancel} className="sticky ml-auto hidden sm:block cursor-pointer top-6 right-2 z-50" alt="" />

        <div className="flex-1 overflow-y-auto scrollbar-hidden">

          <div className="max-w-[600px] min-h-[204px] flex flex-col items-center overflow-hidden relative">

            <div className="w-[454px] h-[444px] absolute -top-[265px] rounded-[50%] shadow-[0_4px_12px_rgba(0,0,0,0.10)]" />
            <div className="w-[240px] h-[245px] absolute -top-[80px] rounded-[50%] shadow-[0_4px_12px_rgba(0,0,0,0.10)]" />

            <img src={item.image} className="mx-auto absolute w-35 h-35 rounded-full" alt="" />

            <div className="text-[14px] text-[#C0C0CF] space-x-1 shadow-[0_4px_12px_rgba(0,0,0,0.50)] font-semibold rounded-xl py-1 px-2 bg-[#F7F7F7] ml-auto mr-3 mt-3 sm:mr-auto sm:ml-3 sm:mt-0 relative flex items-center">
              <img src={item.star} className="w-4 h-4" alt="" />
              <p>{item.rating}</p>
            </div>
          </div>

          <div className="p-[24px] space-y-[25px] mb-18 sm:mb-0">
            <div className="flex justify-between items-center">
              <p className="text-[20px] dark:text-[#FFFFFF] font-bold">{item.name}</p>
              <p className="text-[#FF7B2C] text-[20px] font-extrabold">${(item.price).toFixed(2)}</p>
            </div>
            <p className="text-[15px] dark:text-[#DCDCE4] font-500">{item.text}</p>

            <div className="p-[10px] space-x-[10px] flex justify-between bg-[#FFFFFF] dark:bg-[#4A4A6A] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.10)]">
              {item.nutrients.map((nut) => (
                <div className="px-2 text-center dark:text-[#EAEAEF]">
                  <p className="text-[14px] font-semibold">{nut.amount}</p>
                  <p className="text-[12px] font-600">{nut.unit}</p>
                </div>
              ))}
            </div>
            
            <div>
              <h1 className="text-[#666687] text-[18px] dark:text-[#DCDCE4] font-semibold">Ingredients</h1>
              <div className="py-[10px] space-x-[10px] flex flex-nowrap overflow-x-auto scrollbar-hidden">
                {item.ingredients.map((ingredient) => (
                  <div className="py-[12px] min-w-[80px] space-y-[10px] text-center flex flex-col items-center bg-[#FFFFFF] dark:bg-[#4A4A6A] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.10)]">
                    <img src={ingredient.ingimage} alt="" />
                    <p className="text-[12px] font-600">{ingredient.ingname}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* add toppings */}
            <div>
              <h1 className="text-[#666687] text-[18px] dark:text-[#DCDCE4] font-semibold">Add toppings</h1>
              <div className="py-[10px] space-y-[10px] flex flex-col">
                {item.toppings.map((top) => {
                  const topCount = toppingCounts[top.id] || 1
                  return (
                    <div key={`${top.id}`} className="flex bg-[#FFFFFF] dark:bg-[#4A4A6A] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.10)]">
                      <div className="p-[14px] text-center flex w-full items-center justify-between ">
                        <div className="flex space-x-2 items-center">
                          <motion.div
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                              toggleCheck(top.id)
                              // when selecting a topping initialize its count to 1 if not present
                              if (!selectedToppings.has(top.id)) setToppingCounts(prev => ({ ...prev, [top.id]: (prev[top.id] || 0) || 1 }))
                            }}
                            className="w-4 h-4 border border-black dark:border-white rounded-sm cursor-pointer flex items-center justify-center">
                            <img src={Check} alt="" className={`w-full h-full ${selectedToppings.has(top.id) ? 'flex' : 'hidden'}`} />
                          </motion.div>

                          <p className="text-[12px] md:text-[16px] font-600">{top.name}</p>
                        </div>
                        <p className="text-[#FF7B2C] text-[14px] md:text-[16px] font-semibold">
                          {!selectedToppings.has(top.id) ? formatPrice(top.price) : formatPrice(top.price * topCount)}
                        </p>
                      </div>

                      <div className={`${selectedToppings.has(top.id) ? 'w-[98px] rounded-r-xl flex items-center justify-center gap-[8px] bg-[#EAEAEF] dark:bg-[#212134] p-2' : 'hidden'}`}>
                        {/* minus top */}
                        <button onClick={() => decrementTopping(top.id)} type="button" disabled={topCount === 0} className={topCount === 0 ? 'cursor-not-allowed' : 'cursor-pointer'}>
                          <img src={minus} className="w-8 h-8" alt="-" />
                        </button>

                        <p className="text-[14px] font-semibold">{topCount}</p>

                        {/* add top */}
                        <button onClick={() => incrementTopping(top.id)} type="button" className="">
                          <img src={Plus} className="w-8 h-8 cursor-pointer" alt="+" />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* comment */}
            <div className="space-y-[12px]">
              <h1 className="text-[#666687] text-[18px] dark:text-[#DCDCE4] font-semibold">Add a request</h1>
              <textarea name="" id="" className="px-[16px] py-[12px] rounded-2xl bg-[#FFFFFF] dark:bg-[#4A4A6A4D] border border-[#EAEAEF] dark:border-[#666687] w-full" placeholder="Ex: Don't add onion"></textarea>
            </div>
          </div>
        </div>

        {/* footer section */}
        <div className="w-full flex justify-center sticky bottom-0 rounded-t-2xl sm:rounded-bl-2xl rounded-b-none p-3 bg-[#FCFCFC] dark:bg-[#212134] z-10 space-x-4">
          <div className="flex items-center w-[127px] gap-[8px] rounded-2xl bg-[#EAEAEF] dark:bg-[#4A4A6A] px-2">

            {/* decrement button */}
            <button onClick={Decrement} type="button" disabled={count === 0} className={count === 0 ? 'cursor-not-allowed' : 'cursor-pointer'}>
              <img src={minus} className="w-12 h-12" alt="-" />
            </button>

            <p className=" text-center">{count}</p>

            {/* increment button */}
            <button onClick={Increment} type="button" className="">
              <img src={Plus} className="w-12 h-12 cursor-pointer" alt="+" />
            </button>
          </div>

          <motion.div
            whileTap={{ scale: 0.96 }} 
            onClick={() => {
              const selected = Array.from(selectedToppings).map(id => {
                const t = item.toppings.find(tt => tt.id === id)!
                const qty = toppingCounts[id] || 0
                return { id: t.id, name: t.name, price: t.price, qty, total: t.price * qty }
              })

              const order = {
                id: item.id,
                name: item.name,
                image: item.image,
                star: item.star,
                rating: item.rating,
                reviews: item.reviews,
                basePrice: item.price,
                toppings: selected,
                qty: count,
                price: (item.price + toppingsTotal) * count,
              }

              onAddToOrder?.(order)
              onClose()
            }}
            className='w-full text-center p-3 rounded-2xl bg-[#32324D] dark:bg-[#615793] text-white cursor-pointer flex justify-center space-x-2'>
              <p>Add to order</p>
              <p className="font-bold">{formatPrice((item.price + toppingsTotal) * count)}</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default ViewDish


// my mother says you whole life is in the hand of God : John Bellion