import { useEffect, useRef, useState } from "react"
import { Todo } from "./todo";

export const Shower = ({ todos, update }: any) => {

    function change(e: any) {
        let data = localStorage.getItem("todos");

        if (!data) {
            update([]);
        } else {
            let result = [];
            let json = JSON.parse(data)
            json[`${e.target.id}`] = e.target.checked;
            for (const key in json) {
                if (json.hasOwnProperty(key)) {
                    result.push([key, json[key]]);
                }
            }
            localStorage.setItem(`todos`, JSON.stringify(json));
            update(result);
        }
    }

    const deel = {
        name: "",
        _delete: function (name: string) {
            const t = name;
            return function () {
                let data = localStorage.getItem("todos");

                if (!data) {
                    update([]);
                } else {
                    let result = [];
                    let json = JSON.parse(data);
                    delete json[`${t}`];
                    for (const key in json) {
                        if (json.hasOwnProperty(key)) {
                            result.push([key, json[key]]);
                        }
                    }
                    localStorage.setItem(`todos`, JSON.stringify(json));
                    update(result);
                }
            }
        }
    }

    return (
        <div className=" shower flex text-white mt-[100px] items-center justify-center">
            {todos.map((todo: Array<any>, index: number) => {
                let d = deel;
                deel.name = todo[0];
                // console.log(deel);
                return (<div className="todos" >
                    <Todo todo={todo} change={change} del={d} />
                </div>);
            })}
        </div >
    )
}