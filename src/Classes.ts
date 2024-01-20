import React, { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from 'react';

type PolymorphicAsProp<E extends ElementType> = {
	as?: E
}
export type PolymorphicProps<E extends ElementType> = PropsWithChildren<
	ComponentPropsWithoutRef<E> & PolymorphicAsProp<E>
>;