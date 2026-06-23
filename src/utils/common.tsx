
 export const renderStars = (rating: number) => {
    const rounded = Math.round(rating);

    return (
      <>
        {[...Array(5)].map((_, index) => (
          <span key={index}>
            {index < rounded ? "★" : "☆"}
          </span>
        ))}
      </>
    );
  };