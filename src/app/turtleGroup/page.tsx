'use client';

import React, { useReducer } from 'react';

type State = {
    inputs: string[];
    progresses: number[];
};

type Action =
    | { type: 'updateInput'; index: number; value: string }
    | { type: 'submitStep'; index: number };

const initialState: State = {
    inputs: ['', '', '', ''],
    progresses: [0, 0, 0, 0],
};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'updateInput':
            const updatedInputs = [...state.inputs];
            updatedInputs[action.index] = action.value;
            return { ...state, inputs: updatedInputs };

        case 'submitStep':
            const stepInput = state.inputs[action.index];
            const step = parseInt(stepInput);
            const isValidStep = !isNaN(step) && step > 0;

            const newProgresses = [...state.progresses];
            const clearedInputs = [...state.inputs];
            if (isValidStep && newProgresses[action.index] < 30) {
                newProgresses[action.index] += 1;
            }
            clearedInputs[action.index] = '';
            return { ...state, progresses: newProgresses, inputs: clearedInputs };

        default:
            return state;
    }
};

export default function ProgressApp() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div className="max-w-xl mx-auto mt-10 space-y-6">
            <h1 className="text-2xl font-bold text-center mb-6">پیشرفت لاک‌پشتی 🐢</h1>
            {state.inputs.map((input, index) => (
                <div key={index} className="space-y-2">
                    <input
                        type="number"
                        value={input}
                        onChange={(e) =>
                            dispatch({ type: 'updateInput', index, value: e.target.value })
                        }
                        placeholder="تعداد قدم امروز"
                        className="w-full border p-2 rounded"
                    />
                    <button
                        onClick={() => dispatch({ type: 'submitStep', index })}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        ثبت
                    </button>

                    <div className="relative h-6 bg-gray-300 rounded overflow-hidden mt-2">
                        {/* لاک‌پشت 🐢 */}
                        <div
                            className="absolute -top-1 text-xl transition-all duration-300"
                            style={{
                                left: `${(state.progresses[index] / 30) * 100}%`,
                                transform: 'translateX(-50%)',
                            }}
                        >
                            🐢
                        </div>
                        {/* خود نوار پیشرفت */}
                        <div
                            className="h-full bg-green-500 transition-all duration-300"
                            style={{
                                width: `${(state.progresses[index] / 30) * 100}%`,
                            }}
                        ></div>
                    </div>
                    <div className="text-sm text-gray-600 text-right">
                        {state.progresses[index]} / 30 روز
                    </div>
                </div>
            ))}
        </div>
    );
}
