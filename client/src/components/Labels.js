import React from 'react';
import { default as api } from '../store/apiSlice';
import { getLabels } from '../helper/helper';

export default function Labels() {
    const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();
    console.log(data,isFetching)
    let Transactions = null;

    if (isFetching) {
        Transactions = <div>Fetching...</div>;
    } else if (isSuccess) {
        Transactions = getLabels(data, 'type').map((v, i) => (
            <LabelComponent key={i} data={v} />
        ));
    } else if (isError) {
        Transactions = <div>Error fetching data</div>;
    }

    return (
        <>
            {Transactions}
        </>
    );
}

function LabelComponent({ data }) {
    if (!data) return null;

    return (
        <div className="labels flex justify-between">
            <div className="flex gap-2">
                <div
                    className="w-2 h-2 rounded py-3"
                    style={{ background: data.color ?? '#f9c74f' }}
                ></div>
                <h3 className="text-md">{data.type ?? 'Unknown'}</h3>
            </div>
            <h3 className="font-bold">{Math.round(data.percent) || 0}%</h3>
        </div>
    );
}
