"use client";

import { Button } from "@/components/ui/button";
import {
  dec,
  decByVal,
  inc,
  incByVal,
  reset,
  selectCounter,
} from "@/lib/features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hookss";

const Counter = () => {
  const counter = useAppSelector(selectCounter);
  const dispatch = useAppDispatch();

  return (
    <div className="mt-40 flex min-h-screen flex-col items-center space-y-10">
      <h1 className="text-2xl">
        Counter: <span className="font-bold">{counter}</span>
      </h1>
      <div className="space-x-6">
        <Button onClick={() => dispatch(inc())}>+</Button>
        <Button onClick={() => dispatch(dec())}>-</Button>
        <Button onClick={() => dispatch(incByVal(5))}>+5</Button>
        <Button onClick={() => dispatch(decByVal(5))}>-5</Button>
        <Button onClick={() => dispatch(reset())}>Reset</Button>
      </div>
    </div>
  );
};

export default Counter;
