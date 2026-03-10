// recommender.js
import { featuredHampers } from './data.js';

export function getRecommendations({ occasion, budgetLevel, recipient }) {
    // Basic Rule Engine Example
    let scoredHampers = featuredHampers.map(hamper => ({
        ...hamper,
        score: 0
    }));

    scoredHampers.forEach(hamper => {
        // Budget logic (simplified)
        const priceNum = parseInt(hamper.price.replace(/[^\d]/g, ''));
        if (budgetLevel === 'high' && priceNum > 10000) hamper.score += 2;
        if (budgetLevel === 'low' && priceNum < 10000) hamper.score += 2;

        // Occasion Logic
        if (hamper.type.toLowerCase().includes(occasion.toLowerCase())) hamper.score += 3;

        // General Popularity Fallback
        hamper.score += (hamper.rating - 4);
    });

    // Sort by score
    scoredHampers.sort((a, b) => b.score - a.score);

    return scoredHampers.slice(0, 3); // Return top 3
}
