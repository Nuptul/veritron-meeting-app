/* eslint-disable */
/**
 * Generated API for querying and mutating the Convex database.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type { FilterApi } from "convex/server";
import type { GenericMutationCtx, GenericQueryCtx, GenericActionCtx } from "convex/server";

/**
 * A type describing your app's public HTTP actions.
 */
export declare const api: FilterApi<
  typeof import("../analytics.js"),
  GenericQueryCtx<any> | GenericMutationCtx<any> | GenericActionCtx<any>
> &
  FilterApi<
    typeof import("../contacts.js"),
    GenericQueryCtx<any> | GenericMutationCtx<any> | GenericActionCtx<any>
  > &
  FilterApi<
    typeof import("../projects.js"),
    GenericQueryCtx<any> | GenericMutationCtx<any> | GenericActionCtx<any>
  > &
  FilterApi<
    typeof import("../seed.js"),
    GenericQueryCtx<any> | GenericMutationCtx<any> | GenericActionCtx<any>
  > &
  FilterApi<
    typeof import("../services.js"),
    GenericQueryCtx<any> | GenericMutationCtx<any> | GenericActionCtx<any>
  > &
  FilterApi<
    typeof import("../testimonials.js"),
    GenericQueryCtx<any> | GenericMutationCtx<any> | GenericActionCtx<any>
  > &
  FilterApi<
    typeof import("../utils.js"),
    GenericQueryCtx<any> | GenericMutationCtx<any> | GenericActionCtx<any>
  >;