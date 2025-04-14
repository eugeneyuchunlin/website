
export default function Loading() {
    return (
        <>
        </>
    );
}

export function LoadingBio() {
    return (
        <div className="flex w-full flex-col gap-4 mb-10">
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-32"></div>
            <div className="skeleton h-4 w-80"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
        </div>
    );
}

function LoadingNewsItem(){
    return (
        <div className="skeleton h-20 w-full mb-4"></div>
    )

}

export function LoadingNews() {
    return (
        <div className="flex flex-col">
            <div className="flex flex-col mb-10">
                <LoadingNewsItem />
                <LoadingNewsItem />
                <LoadingNewsItem />
            </div>
        </div>
    );
}

export function LoadingMisc() {
    return (
        <div className="flex w-full gap-4 flex-col mb-10">
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
        </div>
    );
}