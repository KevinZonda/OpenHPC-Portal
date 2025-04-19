/* tslint:disable */
/* eslint-disable */
/**
 * OpenHPC
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { VMListItem } from './VMListItem';
import {
    VMListItemFromJSON,
    VMListItemFromJSONTyped,
    VMListItemToJSON,
    VMListItemToJSONTyped,
} from './VMListItem';

/**
 * 
 * @export
 * @interface VMListRespInner
 */
export interface VMListRespInner {
    /**
     * 
     * @type {string}
     * @memberof VMListRespInner
     */
    provider: string;
    /**
     * 
     * @type {Array<VMListItem>}
     * @memberof VMListRespInner
     */
    containers: Array<VMListItem>;
}

/**
 * Check if a given object implements the VMListRespInner interface.
 */
export function instanceOfVMListRespInner(value: object): value is VMListRespInner {
    if (!('provider' in value) || value['provider'] === undefined) return false;
    if (!('containers' in value) || value['containers'] === undefined) return false;
    return true;
}

export function VMListRespInnerFromJSON(json: any): VMListRespInner {
    return VMListRespInnerFromJSONTyped(json, false);
}

export function VMListRespInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): VMListRespInner {
    if (json == null) {
        return json;
    }
    return {
        
        'provider': json['provider'],
        'containers': ((json['containers'] as Array<any>).map(VMListItemFromJSON)),
    };
}

export function VMListRespInnerToJSON(json: any): VMListRespInner {
    return VMListRespInnerToJSONTyped(json, false);
}

export function VMListRespInnerToJSONTyped(value?: VMListRespInner | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'provider': value['provider'],
        'containers': ((value['containers'] as Array<any>).map(VMListItemToJSON)),
    };
}

