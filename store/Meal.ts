import { create } from 'zustand';

interface MealDetails {
  title: string;
  recipe: string;
  ingredients: string;
}

interface MealStore {
  selectedDay: string | null;
  selectedMeal: string | null;
  mealDetails: Record<string, MealDetails>;
  setSelectedDay: (day: string) => void;
  setSelectedMeal: (meal: string) => void;
  updateMealDetails: (mealType: string, details: MealDetails) => void;
}

export const useMealStore = create<MealStore>((set) => ({
  selectedDay: null,
  selectedMeal: null,
  mealDetails: {},

  setSelectedDay: (day) => set({ selectedDay: day }),
  setSelectedMeal: (meal) => set({ selectedMeal: meal }),
  updateMealDetails: (mealType, details) =>
    set((state) => ({
      mealDetails: { ...state.mealDetails, [mealType]: details },
    })),
}));
