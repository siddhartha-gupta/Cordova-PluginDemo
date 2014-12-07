//
//  FileManager.m
//  
//
//  Created by Siddhartha Gupta on 07/12/14.
//
//

#import <Foundation/Foundation.h>
#import "FileManager.h"
#import <sys/xattr.h>

@implementation FileManager

- (void)addSkipBackupAttributeToPath:(NSString*)path {
    u_int8_t b = 1;
    setxattr([path fileSystemRepresentation], "com.apple.MobileBackup", &b, 1, 0, 0);
}

- (void)checkFileExist:(CDVInvokedUrlCommand*)command {
    CDVPluginResult* pluginResult = nil;
    NSString* sourcePath = [command.arguments objectAtIndex:0];
    NSString *response = @"false";
    
    if ([[NSFileManager defaultManager] fileExistsAtPath:sourcePath]) {
        response = @"true";
    }
    
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:response];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)moveFile:(CDVInvokedUrlCommand*)command {
    CDVPluginResult* pluginResult = nil;
    NSString* sourcePath = [command.arguments objectAtIndex:0];
    NSString* targetPath = [command.arguments objectAtIndex:1];

    NSError* error = nil;
    NSString *errorDesc = @"";
    NSFileManager *fileManager = [NSFileManager defaultManager];

    if ([fileManager fileExistsAtPath:targetPath]) {
        if (![fileManager removeItemAtPath:targetPath error:&error]) {
            errorDesc = [NSString stringWithFormat:@"%@ %@", @"Error while deleting the file", targetPath];
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:errorDesc];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        }
    }
    
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *documentsDirectory = [paths objectAtIndex:0];
    NSString *newDir = [documentsDirectory stringByAppendingPathComponent:@"assets"];
    if ([fileManager fileExistsAtPath:targetPath]) {
        [fileManager copyItemAtPath:sourcePath toPath:targetPath error:&error];
        if (error) {
            errorDesc = [NSString stringWithFormat:@"%@ %@", @"Error while moving the file", targetPath];
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:errorDesc];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        }
    } else {
        if ([fileManager createDirectoryAtPath:newDir withIntermediateDirectories:YES attributes:nil error: NULL]) {
            [fileManager copyItemAtPath:sourcePath toPath:targetPath error:&error];
            [self addSkipBackupAttributeToPath:newDir];
            
            if (error) {
                errorDesc = [NSString stringWithFormat:@"%@ %@", @"Error while moving the file", targetPath];
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:errorDesc];
                [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
            }
        }
    }
    
    if (![fileManager removeItemAtPath:sourcePath error:&error]) {
        errorDesc = [NSString stringWithFormat:@"%@ %@", @"Error while deleting the file", targetPath];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:errorDesc];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:targetPath];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)copyFile:(CDVInvokedUrlCommand*)command {
    CDVPluginResult* pluginResult = nil;
    NSString* sourcePath = [command.arguments objectAtIndex:0];
    NSString* targetPath = [command.arguments objectAtIndex:1];
    NSError* error = nil;
    NSString *errorDesc = @"";
    NSFileManager *fileManager = [NSFileManager defaultManager];
    
    if ([fileManager fileExistsAtPath:targetPath]) {
        if (![fileManager removeItemAtPath:targetPath error:&error]) {
            errorDesc = [NSString stringWithFormat:@"%@ %@", @"Error while deleting the file", targetPath];
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:errorDesc];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        }
    }
    
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *documentsDirectory = [paths objectAtIndex:0];
    NSString *newDir = [documentsDirectory stringByAppendingPathComponent:@"assets"];
    if ([fileManager fileExistsAtPath:targetPath]) {
        [fileManager copyItemAtPath:sourcePath toPath:targetPath error:&error];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:targetPath];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    } else {
        if ([fileManager createDirectoryAtPath:newDir withIntermediateDirectories:YES attributes:nil error: NULL]) {
            [fileManager copyItemAtPath:sourcePath toPath:targetPath error:&error];
            [self addSkipBackupAttributeToPath:newDir];
            
            if (error) {
                errorDesc = [NSString stringWithFormat:@"%@ %@", @"Error while copying the file", targetPath];
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:errorDesc];
                [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
            }
        }
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:targetPath];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }
}

- (void)renameFile:(CDVInvokedUrlCommand*)command {
    CDVPluginResult* pluginResult = nil;
    NSString* oldPath = [command.arguments objectAtIndex:0];
    NSString* newFilename = [command.arguments objectAtIndex:1];
    NSError* error;
    NSString *errorDesc = @"";
    NSString *newPath = [[oldPath stringByDeletingLastPathComponent] stringByAppendingPathComponent:newFilename];
    
    if(![[NSFileManager defaultManager] moveItemAtPath:oldPath toPath:newPath error:&error]) {
        errorDesc = [NSString stringWithFormat:@"%@ %@", @"Error while renaming the file", oldPath];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:errorDesc];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:newFilename];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


@end