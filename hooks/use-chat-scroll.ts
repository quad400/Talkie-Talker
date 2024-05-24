import { useEffect, useState } from "react";

type ChatScrollProps = {
  chatRef: React.RefObject<HTMLDivElement>;
  bottomRef: React.RefObject<HTMLDivElement>;
  shouldLoadMore: boolean;
  loadMore: () => void;
  count: number;
  inView: boolean
};

export const useChatScroll = ({
  bottomRef,
  chatRef,
  count,
  loadMore,
  inView,
  shouldLoadMore,
}: ChatScrollProps) => {
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    
    if(inView && shouldLoadMore){
      loadMore()
    }
  }, [shouldLoadMore, loadMore, inView]);

  useEffect(() => {
    const bottomDiv = bottomRef?.current;
    const topDiv = chatRef?.current;

    const shouldAutoScroll = () => {
      if (!hasInitialized && bottomDiv) {
        setHasInitialized(true);
        return true;
      }

      if (!topDiv) {
        return false;
      }

      const distanceFromBottom =
        topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight;

      
      return distanceFromBottom <= 100;
    };

    if (shouldAutoScroll()) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }
  }, [bottomRef, chatRef, hasInitialized, count]);
};
